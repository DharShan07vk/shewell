# Authentication Issue: Auto-Signing Therapists/Professionals

## Problem Statement
When users navigate from vyan-client to vyan-doctor, they are being auto-signed in as therapists even though they shouldn't be. All users are being treated as therapists.

---

## Root Cause Analysis

### 1. **Separate User Tables (No Relationship)**

The database has **TWO completely separate user tables**:

```prisma
// vyan-client database
model User {
  id          String @id @default(cuid())
  email       String @unique
  phoneNumber String
  passwordHash String
  // Regular user properties
}

// vyan-doctor database  
model ProfessionalUser {
  id          String @id @default(cuid())
  email       String @unique
  phoneNumber String
  passwordHash String
  // Professional-specific properties
}
```

**Problem:** These tables are NOT linked. A single email can exist in BOTH tables independently.

---

### 2. **Session Logic - The Bug**

#### vyan-client/src/server/auth.ts (Lines 48-65)
```typescript
callbacks: {
  session: async ({ session, user }) => {
    const userAuth = await db.user.findFirst({
      where: {
        email: {
          equals: session.user.email as string,
          mode: "insensitive",
        },
      },
    });
    if (session.user && userAuth) {
      session.user.id = userAuth.id;
    }
    return session;
  },
}
```

#### vyan-doctor/src/server/auth.ts (Lines 48-65)
```typescript
callbacks: {
  session: async ({ session, user }) => {
    const userAuth = await db.professionalUser.findFirst({
      where: {
        email: {
          equals: session.user.email as string,
          mode: "insensitive",
        },
        deletedAt: null
      },
    });
    if (session.user && userAuth) {
      session.user.id = userAuth.id;
    }
    return { ...session };
  },
}
```

**Issues:**
1. ✗ No user type/role validation
2. ✗ Each portal allows ANY email to login if it exists in their database
3. ✗ A regular user (from vyan-client) can manually access vyan-doctor if they create a ProfessionalUser account with same email
4. ✗ No check to prevent unauthorized access

---

### 3. **How Auto-Sign-In Happens**

**Scenario 1: Same Email in Both Databases**
```
1. User signs up on vyan-client with: john@example.com
   → Creates User table entry

2. User signs up on vyan-doctor with: john@example.com  
   → Creates ProfessionalUser table entry

3. User logs into vyan-client
   → NextAuth creates session with john@example.com

4. User navigates to vyan-doctor (new tab, separate session)
   → If they were logged in earlier, browser has vyan-doctor cookie
   → OR they can login again since john@example.com exists in ProfessionalUser table

Result: User is treated as therapist in vyan-doctor
```

**Scenario 2: Cross-Portal Session Leak** (if cookies/session shared)
```
If NEXTAUTH_SECRET is same for both apps:
  → vyan-client JWT token might be valid in vyan-doctor
  → User auto-signs in without re-authentication
```

---

## Current Architecture Issues

| Issue | Impact | Severity |
|-------|--------|----------|
| **No role/type field** | Can't distinguish users from professionals | 🔴 Critical |
| **Separate auth systems** | Each portal has independent sessions | 🟡 Medium |
| **Email duplication** | Same email in both User tables allowed | 🔴 Critical |
| **No access control** | No validation of user type on portal | 🔴 Critical |
| **JWT Secret sharing** | Sessions might leak across portals | 🟡 Medium |

---

## Solutions

### ❌ **What's Currently NOT Happening**
- ✗ No automatic role assignment
- ✗ No session sharing between portals (independent NextAuth configs)
- ✗ No auto-login mechanism

### ✅ **What SHOULD Happen**

#### Option A: Unified User Table with Roles (Recommended)
```prisma
enum UserRole {
  CLIENT      // Regular user
  PROFESSIONAL // Therapist
  BOTH        // Can be both
}

model User {
  id              String    @id @default(cuid())
  email           String    @unique
  passwordHash    String
  role            UserRole  @default(CLIENT)
  
  // Client-specific
  phoneNumber     String?
  
  // Professional-specific  
  firstName       String?
  lastName        String?
  qualification   String?
  
  createdAt       DateTime  @default(now())
  deletedAt       DateTime?
}
```

#### Session Validation (All Portals)
```typescript
// Enforce role-based access
callbacks: {
  session: async ({ session, user, token }) => {
    const userRecord = await db.user.findUnique({
      where: { email: session.user.email }
    });
    
    // Only allow if correct role
    if (!userRecord || !['PROFESSIONAL', 'BOTH'].includes(userRecord.role)) {
      if (isVyanDoctor) {
        return null; // Reject session
      }
    }
    
    session.user.id = userRecord.id;
    session.user.role = userRecord.role;
    return session;
  }
}
```

#### Option B: Link User Tables (Current Architecture)
```prisma
model User {
  id              String          @id @default(cuid())
  email           String          @unique
  phoneNumber     String
  passwordHash    String
  
  // Link to professional profile (optional)
  professionalUser  ProfessionalUser?
  
  createdAt       DateTime  @default(now())
}

model ProfessionalUser {
  id          String    @id @default(cuid())
  email       String    @unique
  phoneNumber String
  passwordHash String
  
  // Link to user account (if same person)
  regularUser   User?
  
  createdAt   DateTime  @default(now())
}
```

---

## Quick Fix (Temporary)

Add role validation in session callbacks:

```typescript
// vyan-doctor/src/server/auth.ts
callbacks: {
  session: async ({ session, user }) => {
    const userAuth = await db.professionalUser.findFirst({
      where: {
        email: session.user.email,
        deletedAt: null
      },
    });
    
    // ❌ BLOCK: No professional record found
    if (!userAuth) {
      throw new Error("User is not a registered professional");
    }
    
    session.user.id = userAuth.id;
    return { ...session };
  },
}
```

---

## Recommended Implementation Path

1. **Short-term:** Add strict role validation in session callbacks
2. **Medium-term:** Link User and ProfessionalUser tables
3. **Long-term:** Migrate to unified User table with role enum

---

## Files to Check/Modify

### Core Auth Files:
- [vyan-client/src/server/auth.ts](apps/vyan-client/src/server/auth.ts)
- [vyan-doctor/src/server/auth.ts](apps/vyan-doctor/src/server/auth.ts)

### Database Schema:
- [packages/database/prisma/schema.prisma](packages/database/prisma/schema.prisma)

### Login Pages:
- [vyan-client/src/app/auth/login/login-form.tsx](apps/vyan-client/src/app/auth/login/login-form.tsx)
- [vyan-doctor/src/app/auth/login/page.tsx](apps/vyan-doctor/src/app/auth/login/page.tsx)

### Middleware (if any):
- Check for route protection in app directories
