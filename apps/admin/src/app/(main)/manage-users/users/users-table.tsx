'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import React, { ChangeEvent, useRef, useState } from 'react';
import { Demo } from '@/types';
import UserForm from '@/src/app/(main)/manage-users/users/user-form';
import { IUser } from '@/src/_models/user.model';
import { Tag } from 'primereact/tag';
import { FilterMatchMode } from 'primereact/api';

const UsersTable = ({ users }: { users: { id: string; email: string; firstName: string; middleName: string | null; lastName: string | null; accountType: string }[] }) => {
  const emptyUser: IUser = { id: '', email: '', firstName: '', middleName: '', lastName: '', accountType: 'normal', active: false, password: '' };
  const [userDialog, setUserDialog] = useState(false);
  const [user, setUser] = useState<typeof emptyUser>(emptyUser);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const dt = useRef<DataTable<any>>(null);

  const openNew = () => {
    setUser({ ...emptyUser });
    setUserDialog(true);
  };

  const hideDialog = () => {
    setUserDialog(false);
  };

  const editUser = (user: typeof emptyUser) => {
    setUser({ ...user });
    setUserDialog(true);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {/*<FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />*/}
        <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
      </React.Fragment>
    );
  };

  const idBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className="p-column-title">Id</span>
        {rowData.id}
      </>
    );
  };

  const nameBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.firstName} {rowData.middleName} {rowData.lastName}
      </>
    );
  };

  const emailBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.email}
      </>
    );
  };

  const actionBodyTemplate = (rowData: typeof emptyUser) => {
    return (
      <>
        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editUser(rowData)} />
      </>
    );
  };

  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters: any = { ...filters };

    _filters.global.value = value;

    setFilters(_filters);
    setGlobalFilter(value);
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Users</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" value={globalFilter} onChange={onGlobalFilterChange} placeholder="Search..." />
      </span>
    </div>
  );

  const activeBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className="p-column-title">Active</span>
        {rowData.active ? <Tag severity="success">Yes</Tag> : <Tag severity="danger">No</Tag>}
      </>
    );
  };

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>

          <DataTable
            stripedRows
            ref={dt}
            value={users}
            selection={selectedUsers}
            onSelectionChange={(e) => setSelectedUsers(e.value as any)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            filters={filters}
            globalFilterFields={['id', 'name', 'email']}
            emptyMessage="No users found."
            header={header}
            exportFilename="Users"
          >
            <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column field="active" header="Active" sortable body={activeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} frozen={true}></Column>
          </DataTable>

          <Dialog visible={userDialog} style={{ width: '70vw' }} header="User Details" modal className="p-fluid" onHide={hideDialog}>
            <UserForm user={user} hideDialog={hideDialog} />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
