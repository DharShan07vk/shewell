# Prisma Database Schema Documentation

## Overview
This document provides a comprehensive overview of the Prisma database schema for the Shewell application. The database uses PostgreSQL as the provider.

---

## Table of Contents
1. [Configuration](#configuration)
2. [Core Models](#core-models)
3. [Authentication & Sessions](#authentication--sessions)
4. [User Management](#user-management)
5. [Professional Services](#professional-services)
6. [Appointments & Consultations](#appointments--consultations)
7. [Products & Commerce](#products--commerce)
8. [Content Management](#content-management)
9. [Locations & Geography](#locations--geography)
10. [Enumerations](#enumerations)

---

## Configuration

### Generator
```
provider: prisma-client-js
```

### Datasource
```
provider: postgresql
url: env("DATABASE_URL")
```

---

## Core Models

### User
Represents a registered client user in the system.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| email | String | @unique | User's email address |
| name | String | | User's full name |
| passwordHash | String | | Hashed password |
| phoneNumber | String | | Contact phone number |
| otp | String | | One-time password for verification |
| otpCreatedAt | DateTime? | | Timestamp when OTP was created |
| verifiedAt | DateTime? | | Email verification timestamp |
| ageGreaterThan18 | Boolean | | Age verification flag |
| createdAt | DateTime | @default(now()) | Account creation timestamp |
| updatedAt | DateTime | @updatedAt | Last update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- coupon: Coupon[] (Many coupons)
- notification: Notification[] (Many notifications)
- reviews: Review[] (Product reviews)
- wishlistedProducts: Product[] (Wishlist)
- addresses: Address[] (Delivery addresses)
- Order: Order[] (Purchase orders)
- patient: Patient[] (Patient profiles)
- appointments: BookAppointment[] (Booked appointments)
- AuthSession: AuthSession[] (Active sessions)
- sessionRegistrations: SessionRegistration[] (Session registrations)

---

### ProfessionalUser
Represents a healthcare professional (doctor/consultant) in the system.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| firstName | String | | Professional's first name |
| lastName | String? | | Professional's last name |
| phoneNumber | String | | Contact phone number |
| dob | DateTime | | Date of birth |
| email | String | @unique | Professional's email |
| passwordHash | String | | Hashed password |
| userName | String? | @unique | Username handle |
| gender | String? | | Gender |
| sessionMode | String? | | Mode of consultation |
| listing | String? | | Listing information |
| issue | String? | | Specialization area |
| aboutYou | String? | | Professional bio |
| aboutEducation | String? | | Educational background |
| avgRating | Decimal? | | Average rating from appointments |
| totalConsultations | Int? | | Total number of consultations |
| googleAccessToken | String? | | Google API access token |
| googleRefreshToken | String? | | Google API refresh token |
| createdAt | DateTime | @default(now()) | Account creation timestamp |
| updatedAt | DateTime | @updatedAt | Last update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- qualifications: ProfessionalQualifications[]
- displayQualification: ProfessionalSpecializations? (Primary specialization)
- degrees: ProfessionalDegree[] (Educational degrees)
- languages: ProfessionalLanguages[] (Languages spoken)
- experiences: ProfessionalExperience[] (Work experience)
- availability: Availability[] (Weekly availability)
- unavailableDay: UnAvailableDay[] (Blocked dates)
- appointments: BookAppointment[] (Booked appointments)
- professionalUserAppointmentPrices: professionalUserAppointmentPrice[]
- ratings: ProfessionalUserRating[] (Client ratings)
- media: Media? (Profile picture)
- documents: Document[] (Professional documents)
- AuthSession: AuthSession[]
- ProfessionalSpecializations: ProfessionalSpecializations[] (All specializations)

---

## Authentication & Sessions

### AuthSession
Represents an active user session.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| sessionToken | String | @unique | Unique session token |
| expires | DateTime | | Session expiration time |
| createdAt | DateTime | @default(now()) | Session creation timestamp |
| updatedAt | DateTime | @updatedAt | Last update timestamp |

**Relations:**
- user: User (Required)
- professionalUser: ProfessionalUser (Required)

---

### SessionRegistration
Tracks user registration for educational sessions.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| paymentStatus | PaymentStatus | @default(PENDING) | Payment status |
| createdAt | DateTime | @default(now()) | Registration timestamp |

**Relations:**
- session: Session (Required)
- user: User (Required)

**Unique Constraint:** (sessionId, userId) - One registration per user per session

---

## User Management

### Notification
Represents notifications sent to users.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| title | String | | Notification title |
| description | String | | Notification body |
| createdAt | DateTime | | Creation timestamp |
| updatedAt | DateTime | | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- user: User (Required)

---

### Address
Represents delivery or contact addresses.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| name | String | | Address label/name |
| mobile | String | | Contact number |
| houseNo | String | | House/building number |
| area | String | | Area/street name |
| city | String | | City name |
| landmark | String | | Landmark for reference |
| pincode | String | | Postal/zip code |
| addressType | String | | Type: Home/Office/Other |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- user: User (Required)
- country: Country (Required)
- state: State (Required)
- orders: Order[] (Delivery for orders)

---

### Patient
Represents patient profiles for appointment bookings.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| firstName | String | | Patient's first name |
| lastName | String? | | Patient's last name |
| email | String | | Patient's email |
| phoneNumber | String | | Patient's phone |
| message | String? | | Additional notes/message |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- user: User (Required)
- appointments: BookAppointment[]
- additionalPatients: AdditionalPatient[]

---

### AdditionalPatient
Represents additional patients (family members) for a user.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| firstName | String | | Patient's first name |
| lastName | String? | | Patient's last name |
| email | String | | Patient's email |
| phoneNumber | String | | Patient's phone |
| message | String? | | Additional notes |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- patient: Patient? (Parent patient)

---

## Professional Services

### ProfessionalQualifications
Stores professional educational and licensing qualifications.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| degree | String[] | | Array of degrees |
| city | String | | City of qualification |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

**Relations:**
- state: State (Required)
- city: City
- professionalUser: ProfessionalUser (Required)
- professionalExperiences: ProfessionalExperience[]

---

### ProfessionalDegree
Represents educational degrees of professionals.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| degree | String | | Degree name/description |

**Relations:**
- professionalUser: ProfessionalUser (Required)

---

### ProfessionalExperience
Represents work experience of professionals.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| startingYear | String | | Start year |
| endingYear | String | | End year |
| department | String | | Department/specialty |
| position | String | | Job position/title |
| location | String | | Work location |

**Relations:**
- professionalUser: ProfessionalUser (Required)
- professionalQualifications: ProfessionalQualifications?

---

### ProfessionalSpecializations
Represents medical specializations of professionals.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| specialization | String | | Specialization name |
| active | Boolean | | Activation status |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- professionalUser: ProfessionalUser[]
- displayQualificationUsers: ProfessionalUser[] (Marked as primary)
- professionalSpecializationParentCategory: ProfessionalSpecializationParentCategory?

---

### ProfessionalSpecializationParentCategory
Parent category for specializations (e.g., Medical, Mental Health, etc.).

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| name | String | | Category name |
| active | Boolean | | Activation status |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- specializations: ProfessionalSpecializations[]
- media: Media (Required) (Category icon/image)

---

### ProfessionalLanguages
Languages spoken by professionals.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| language | String | | Language name |
| active | Boolean | | Activation status |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- professionalUsers: ProfessionalUser[] (Many-to-many)

---

### Availability
Represents weekly availability schedule of professionals.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| available | Boolean | | Is available on this day |
| day | Day | | Day of week (enum) |

**Relations:**
- professionalUser: ProfessionalUser (Required)
- availableTimings: AvailabilityTimings[]

---

### AvailabilityTimings
Specific time slots for availability on a given day.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| startingTime | DateTime | @db.Time() | Start time |
| endingTime | DateTime | @db.Time() | End time |

**Relations:**
- availability: Availability?

---

### UnAvailableDay
Represents blocked/unavailable dates.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| date | DateTime | @db.Date | Blocked date |

**Relations:**
- professionalUser: ProfessionalUser?

---

### professionalUserAppointmentPrice
Pricing configuration for appointments with specific durations.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| time | Int | | Duration in minutes |
| priceInCentsForSingle | Int | | Price for single consultation |
| priceInCentsForCouple | Int | | Price for couple consultation |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

**Relations:**
- professionalUser: ProfessionalUser (Required)

---

### ProfessionalUserRating
Client ratings for professional consultations.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| rating | Int | | Rating score (1-5 typically) |
| review | String | | Review text |
| createdAt | DateTime | @default(now()) | Creation timestamp |

**Relations:**
- professionalUser: ProfessionalUser?
- bookAppointment: BookAppointment (Required, @unique)

---

## Appointments & Consultations

### BookAppointment
Represents a booked appointment between a patient and professional.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| serviceType | AppointmentType | | ONLINE or OFFLINE |
| priceInCents | Int | | Appointment fee in cents |
| taxedAmount | Int? | | Tax amount |
| totalPriceInCents | Int? | | Total price including tax |
| description | String | | Appointment details |
| planName | String | | Plan/service name |
| startingTime | DateTime | | Appointment start time |
| endingTime | DateTime | | Appointment end time |
| status | BookAppointmentStatus? | | Current status |
| razorpayOrderId | String? | | Razorpay order ID |
| razorpayPaymentId | String? | | Razorpay payment ID |
| razorpayRefundId | String? | | Razorpay refund ID |
| meeting | Json? | | Meeting details (for online) |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

**Relations:**
- professionalUser: ProfessionalUser (Required)
- patient: Patient (Required)
- user: User (Required)
- comments: Comment[]
- professionalRating: ProfessionalUserRating?

---

### Comment
Comments on appointments.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| comment | String | | Comment text |
| createdAt | DateTime | @default(now()) | Creation timestamp |

**Relations:**
- bookAppointment: BookAppointment (Required)

---

## Products & Commerce

### Product
Represents a product in the catalog.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| name | String | | Product name |
| slug | String | | URL-friendly slug |
| description | String | | Detailed description |
| shortDescription | String | | Brief description |
| avgRating | Decimal | | Average customer rating |
| totalReviews | Int | | Total review count |
| bestSeller | Boolean | @default(false) | Best seller flag |
| seoTitle | String? | | SEO title |
| seoDescription | String? | | SEO description |
| seoKeywords | String[] | | SEO keywords array |
| active | Boolean | @default(false) | Availability status |
| productCategory | ProductCategory? | | MOTHER or CHILD |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- category: Category (Required)
- productBenefits: ProductBenefit[]
- productVariants: ProductVariant[]
- productStats: ProductStats[]
- media: MediaOnProducts[]
- userWishlisted: User[] (Wishlist)
- review: Review[]
- coupon: Coupon[]
- faq: FAQ[]

---

### ProductVariant
Variants of a product (size, color, etc.).

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| sku | String? | | Stock keeping unit |
| name | String | | Variant name |
| priceInCents | Int | | Price in cents |
| discountInCents | Int? | | Discount amount |
| discountInPercentage | Int? | | Discount percentage |
| discountEndDate | DateTime? | | Discount expiration |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- product: Product?
- lineItems: LineItem[]
- productVariantInventory: ProductVariantInventory?

---

### ProductVariantInventory
Inventory levels for product variants.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| incoming | Int | @default(0) | Incoming inventory |
| unavailable | Int | @default(0) | Unavailable inventory |
| available | Int | @default(0) | Available for sale |
| onHand | Int | @default(0) | Total on hand |
| commited | Int | @default(0) | Committed to orders |

**Relations:**
- productVariant: ProductVariant (Required, @unique)
- productVariantInventoryUpdates: ProductVariantInventoryUpdate[]

---

### ProductVariantInventoryUpdate
Tracks inventory adjustments.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| quantity | Int | | Quantity adjusted |
| reason | String | | Reason for adjustment |
| updateType | ProductVariantInventoryUpdateType | | Type of update |

**Relations:**
- productVariantInventory: ProductVariantInventory (Required)
- updateBy: AdminUser (Required)

---

### ProductBenefit
Benefits/features of a product.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| benefit | String | | Benefit description |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- product: Product (Required)

---

### ProductStats
Statistics/specifications for products.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| title | String | | Stat title |
| stat | String | | Stat value |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- product: Product (Required)

---

### Review
Product reviews from customers.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| rating | String | | Star rating |
| review | String | | Review text |
| approved | Boolean | @default(false) | Approval status |
| active | Boolean? | @default(false) | Active status |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

**Relations:**
- user: User (Required)
- product: Product (Required)

---

### FAQ
Frequently asked questions for products.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| question | String | | Question text |
| answer | String | | Answer text |
| order | Int | @default(0) | Display order |

**Relations:**
- product: Product (Required)

---

### LineItem
Individual items in an order.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| perUnitPriceInCent | Int | | Unit price |
| quantity | Int | | Quantity ordered |
| subTotalInCent | Int | | Subtotal before discounts |
| discountInCent | Int | | Discount applied |
| totalInCent | Int | | Final total |

**Relations:**
- order: Order (Required)
- productVariant: ProductVariant (Required)

---

### Order
Represents a customer purchase order.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| status | OrderStatus | | Current order status |
| discountInCent | Int? | | Total discount |
| expectedDelivery | DateTime? | | Expected delivery date |
| subTotalInCent | Int | | Subtotal |
| taxesInCent | Int | | Tax amount |
| deliveryFeesInCent | Int | | Shipping cost |
| totalInCent | Int | | Grand total |
| orderPlaced | DateTime | | Order placement time |
| height | Decimal? | @db.Decimal(9,2) | Package height |
| breadth | Decimal? | @db.Decimal(9,2) | Package width |
| length | Decimal? | @db.Decimal(9,2) | Package length |
| weight | Decimal? | @db.Decimal(9,2) | Package weight |
| razorpay_order_id | String? | | Razorpay order ID |
| razorpay_payment_id | String? | | Razorpay payment ID |
| razorpay_signature | String? | | Payment signature |
| razorpay_refund_id | String? | | Refund ID |
| shiprocket_order_id | String? | | Shiprocket order ID |
| shiprocket_shipment_id | String? | | Shiprocket shipment ID |
| cancelledDate | DateTime? | | Cancellation date |

**Relations:**
- user: User (Required)
- address: Address (Required)
- coupon: Coupon?
- lineItems: LineItem[]

---

### Coupon
Discount coupons.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| code | String | @unique | Coupon code |
| amount | Int | | Discount amount/percentage |
| isPercent | Boolean | | Is percentage or fixed |
| description | String | | Coupon description |
| newUser | Boolean | | Only for new users |
| numberOfTime | Int | | Max uses |
| active | Boolean | | Activation status |
| expiresAt | DateTime | | Expiration date |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- categories: Category[]
- products: Product[]
- users: User[]
- orders: Order[]

---

## Content Management

### Blog
Blog posts.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| title | String | | Blog title |
| slug | String | @unique | URL slug |
| author | String | | Author name |
| body | String | | Blog content |
| shortDescription | String? | | Brief description |
| active | Boolean | | Published status |
| popularBlog | Boolean? | @default(false) | Feature flag |
| seoTitle | String? | | SEO title |
| seoDescription | String? | | SEO description |
| seoKeywords | String[] | | SEO keywords |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- category: BlogCategory (Required)
- media: Media (Required)

---

### BlogCategory
Categories for blog posts.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| name | String | | Category name |
| slug | String | @unique | URL slug |
| active | Boolean | | Activation status |
| metaTitle | String? | | SEO title |
| metaDescription | String? | | SEO description |
| metaKeywords | String[] | | SEO keywords |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- blogs: Blog[]

---

### Category
Product categories.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| name | String | | Category name |
| slug | String | | URL slug |
| active | Boolean | @default(false) | Activation status |
| order | Int? | @unique | Sort order |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- products: Product[]
- parentCategory: Category? (Self-referential)
- childCategories: Category[] (Self-referential)
- media: Media?
- coupon: Coupon[]

---

### Media
Represents media files (images, documents).

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| fileKey | String | | File storage key |
| comments | String | | File comments |
| fileUrl | String? | | Public file URL |
| mimeType | String | | File MIME type |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

**Relations:**
- categories: Category[]
- products: MediaOnProducts[]
- blogs: Blog[]
- professionalUser: ProfessionalUser?
- homeBanners: HomeBanner[]
- testimonials: Testimonials[]
- specializationParentCategory: ProfessionalSpecializationParentCategory[]

---

### MediaOnProducts
Join table for many-to-many relationship between Media and Products.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| order | Int | | Display order |
| imageAltText | String? | | Alt text for image |
| comment | String? | | Comments |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

**Relations:**
- product: Product (Required)
- media: Media (Required)

**Composite Key:** (mediaId, productId)

---

### Document
Professional documents (licenses, certifications).

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| fileKey | String | | File storage key |
| comments | String? | | File comments |
| fileUrl | String? | | Public file URL |
| mimeType | String? | | File MIME type |
| type | DocumentType? | | Document type enum |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

**Relations:**
- professionalUser: ProfessionalUser (Required)

---

### HomeBanner
Promotional banners for home pages.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| order | Int | | Display order |
| url | String? | | Link URL |
| active | Boolean | @default(false) | Activation status |
| usedFor | HomeBannerType | | Target page |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- media: Media?

---

### Testimonials
Customer testimonials.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| title | String | | Testimonial title |
| name | String | | Customer name |
| active | Boolean | | Activation status |
| avgRating | Decimal? | | Rating |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- media: Media?

---

## Locations & Geography

### Country
Countries supported by the platform.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| name | String | | Country name |
| iso3 | String | | ISO 3166-1 alpha-3 code |
| iso2 | String | | ISO 3166-1 alpha-2 code |
| phoneCode | String | | International dialing code |
| currency | String | | Currency code |
| currencyName | String | | Currency name |
| currencySymbol | String | | Currency symbol |
| region | String? | | Geographic region |
| regionId | String? | | Region ID |
| subRegion | String? | | Sub-region |
| subregionId | String? | | Sub-region ID |
| nationality | String? | | Nationality |
| timezones | Json? | | Timezone information |
| active | Boolean | @default(false) | Activation status |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

**Relations:**
- states: State[]
- cities: City[]
- addresses: Address[]

---

### State
States/provinces within countries.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| name | String | | State name |
| stateCode | String | | State code |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- country: Country (Required)
- cities: City[]
- addresses: Address[]
- qualifications: ProfessionalQualifications[]
- availablePincodes: AvailablePincodes[]

---

### City
Cities within states.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| name | String | | City name |
| latitude | Decimal | | Geographic latitude |
| longitude | Decimal | | Geographic longitude |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |
| deletedAt | DateTime? | | Soft delete timestamp |

**Relations:**
- country: Country (Required)
- state: State (Required)
- qualifications: ProfessionalQualifications[]

---

### AvailablePincodes
Serviceable postal codes.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| pincode | String | | Postal code |
| deletedAt | DateTime? | | Soft delete timestamp |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

**Relations:**
- state: State?

---

## Educational Sessions

### Session
Paid educational sessions.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| title | String | | Session title |
| slug | String | @unique | URL slug |
| startAt | DateTime | | Session start time |
| endAt | DateTime | | Session end time |
| price | Decimal | @db.Decimal(10,2) | Session price |
| status | SessionStatus | @default(DRAFT) | Current status |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

**Relations:**
- category: SessionCategory (Required)
- registrations: SessionRegistration[]

---

### SessionCategory
Categories for educational sessions.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| name | String | | Category name |
| slug | String | @unique | URL slug |
| trimester | Trimester | | Associated trimester |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

**Relations:**
- sessions: Session[]

---

## Administrative

### AdminUser
System administrators.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| name | String | | Admin name |
| email | String | @unique | Admin email |
| passwordHash | String | | Hashed password |
| active | Boolean | @default(false) | Account status |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

**Relations:**
- productVariantInventoryUpdates: ProductVariantInventoryUpdate[]

---

### AppConfig
Application configuration settings.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| key | String | @unique | Config key |
| value | String | | Config value |
| createdAt | DateTime | @default(now()) | Creation timestamp |
| updatedAt | DateTime | @updatedAt | Update timestamp |

---

### Newsletter
Email newsletter subscriptions.

| Field | Type | Special Attributes | Description |
|-------|------|-------------------|-------------|
| id | String | @id, @default(cuid()) | Primary key |
| email | String | | Subscriber email |
| userType | userType | | Subscriber type |

**Unique Constraint:** (email, userType) - One subscription per email per type

---

## Enumerations

### OrderStatus
```
CART - Item in shopping cart
PAYMENT_SUCCESSFUL - Payment completed
PAYMENT_PENDING - Awaiting payment
PAYMMENT_FAILED - Payment failed (note: typo in enum)
OUT_FOR_DELIVERY - In transit to customer
CANCELLED - Order cancelled
RETURNED - Product returned
DELIVERED - Delivered to customer
```

### AppointmentType
```
ONLINE - Video/virtual consultation
OFFLINE - In-person consultation
```

### BookAppointmentStatus
```
PAYMENT_SUCCESSFUL - Payment completed
PAYMENT_PENDING - Awaiting payment
PAYMMENT_FAILED - Payment failed
CANCELLED - Appointment cancelled
CANCELLED_WITH_REFUND - Cancelled with refund issued
COMPLETED - Consultation completed
```

### Day
```
SUN - Sunday
MON - Monday
TUE - Tuesday
WED - Wednesday
THU - Thursday
FRI - Friday
SAT - Saturday
```

### Trimester
```
FIRST - First trimester
SECOND - Second trimester
THIRD - Third trimester
```

### SessionStatus
```
DRAFT - Session not published
PUBLISHED - Session active
COMPLETED - Session completed
CANCELLED - Session cancelled
```

### PaymentStatus
```
PENDING - Awaiting payment
COMPLETED - Payment completed
FAILED - Payment failed
REFUNDED - Payment refunded
```

### ProductCategory
```
MOTHER - Products for mothers
CHILD - Products for children
```

### DocumentType
```
AADHAR_CARD - Indian ID card
PAN_CARD - Tax identification card
OTHER_DOCUMENTS - Other documents
```

### HomeBannerType
```
HomeBannerClient - Banner for client homepage
HomeBannerDoctor - Banner for professional/doctor homepage
```

### userType
```
CLIENT - Regular client user
PROFESSIONAL_USER - Healthcare professional user
```

### ProductVariantInventoryUpdateType
```
ADJUST_AVAILABLE - Adjust available inventory
MOVE_TO_UNAVAILABLE - Move to unavailable
ADJUST_ON_HAND - Adjust total on-hand quantity
```

---

## Key Relationships Summary

### Many-to-Many Relationships
- **User ↔ Product**: Through wishlist
- **User ↔ Coupon**: User can have multiple coupons
- **ProfessionalUser ↔ ProfessionalLanguages**: Professional can speak multiple languages
- **Product ↔ Media**: Through MediaOnProducts join table
- **Coupon ↔ Category**: Coupon applicable to multiple categories
- **Coupon ↔ Product**: Coupon applicable to multiple products

### One-to-Many Relationships
- User → Notification, Review, Address, Order, Patient, BookAppointment, AuthSession, SessionRegistration
- ProfessionalUser → ProfessionalQualifications, ProfessionalDegree, ProfessionalExperience, Availability, UnAvailableDay, BookAppointment, ProfessionalUserRating, Document
- Product → ProductVariant, ProductBenefit, ProductStats, Review, FAQ, LineItem
- Category → Product, Category (self), Coupon
- Blog → BlogCategory

### Self-Referential Relationships
- Category ↔ Category: Parent-Child relationship for category hierarchy
- ProfessionalUser ↔ ProfessionalUser: Through ProfessionalSpecializations display qualification

---

## Data Integrity Notes

1. **Soft Deletes**: Models with `deletedAt` field support soft deletion
2. **Automatic Timestamps**: `createdAt` defaults to current timestamp, `updatedAt` automatically updates
3. **Unique Constraints**: Email fields are unique, codes must be unique
4. **Composite Keys**: MediaOnProducts uses composite key (mediaId, productId)
5. **Required Relations**: Relations without `?` are required fields
6. **Cascade Deletes**: AuthSession cascades delete on User deletion

---

## Recent Features

- **Educational Sessions**: Paid course/session management with registration tracking
- **Professional Services**: Complete professional profile, scheduling, and appointment system
- **Appointment System**: Dual appointment types (Online/Offline) with pricing and ratings
- **Payment Integration**: Razorpay integration for orders and appointments
- **Shipping Integration**: Shiprocket integration for order fulfillment
- **Inventory Management**: Detailed product variant inventory tracking
- **Newsletter Management**: Dual newsletter subscriptions for different user types

