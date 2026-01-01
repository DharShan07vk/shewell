'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import React, { ChangeEvent, useRef, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Tag } from 'primereact/tag';
import { deletePincode } from '@/src/app/(main)/manage-locations/pincodes/pincode-actions';
import { ICountryWithStateSelect } from '@/src/_models/country.model';
import { IPincode, IPincodeForm } from '@/src/_models/pincode.model';
import PincodeForm from '@/src/app/(main)/manage-locations/pincodes/pincode-form';

const PincodesTable = ({ availablePincodes, countries }: { availablePincodes: IPincode[]; countries: ICountryWithStateSelect[] }) => {
  const emptyState: IPincodeForm = { id: '', pincode: '', stateId: '' };
  const [pincodeDialog, setStateDialog] = useState(false);
  const [pincode, setState] = useState<IPincodeForm>(emptyState);
  const [selectedPincodes, setSelectedPincodes] = useState<IPincode[]>([]);
  const [confirmStateDeleteDialog, setConfirmStateDeleteDialog] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const dt = useRef<DataTable<IPincode[]>>(null);

  const openNew = () => {
    setState({ ...emptyState });
    setStateDialog(true);
  };

  const hideDialog = () => {
    setStateDialog(false);
  };

  const editState = (pincode: IPincode) => {
    setState({ ...pincode });
    setStateDialog(true);
  };

  const deleteStateConfirm = (pincode: IPincode) => {
    setSelectedPincodes([pincode]);
    setConfirmStateDeleteDialog(true);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const confirmDelete = () => {
    setConfirmStateDeleteDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
          <Button label="Delete" icon="pi pi-trash" severity="danger" className=" mr-2" onClick={confirmDelete} disabled={!selectedPincodes || !selectedPincodes.length} />
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

  const idBodyTemplate = (rowData: IPincode) => {
    return (
      <>
        <span className="p-column-title">Id</span>
        {rowData.id}
      </>
    );
  };

  const pincodeBodyTemplate = (rowData: IPincode) => {
    return (
      <>
        <span className="p-column-title">Pincode</span>
        {rowData.pincode}
      </>
    );
  };

  const actionBodyTemplate = (rowData: IPincode) => {
    return (
      <>
        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editState(rowData)} />
        <Button icon="pi pi-trash" rounded severity="danger" className="mr-2" onClick={() => deleteStateConfirm(rowData)} />
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
      <h5 className="m-0">Manage Pincodes</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" value={globalFilter} onChange={onGlobalFilterChange} placeholder="Search..." />
      </span>
    </div>
  );

  const hideConfirmPincodesDeleteDialog = () => {
    setConfirmStateDeleteDialog(false);
  };

  const deleteSelectedPincodes = () => {
    if (!selectedPincodes) {
      return;
    }
    deletePincode(selectedPincodes.map((c) => c.id!))
      .then(() => {})
      .catch(() => {});
  };

  const confirmPincodesDeleteDialogFooter = (
    <React.Fragment>
      <Button label="Delete" icon="pi pi-check" severity="danger" onClick={() => deleteSelectedPincodes()} />
    </React.Fragment>
  );

  const headerTemplate = (data: IPincode) => {
    return (
      <div className="flex align-items-center gap-2">
        <span className="font-bold">
          {data.state?.country.name} - {data.state?.name}
        </span>
      </div>
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
            rowGroupMode="subheader"
            groupRowsBy="state.name"
            rowGroupHeaderTemplate={headerTemplate}
            selectionMode="multiple"
            value={availablePincodes}
            selection={selectedPincodes}
            onSelectionChange={(e) => setSelectedPincodes(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            filters={filters}
            globalFilterFields={['id', 'name', 'state.name', 'state.country.name']}
            emptyMessage="No pincodes found."
            header={header}
            exportFilename="Pincodes"
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column field="pincode" header="Pincode" sortable body={pincodeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} frozen={true}></Column>
          </DataTable>

          <Dialog visible={pincodeDialog} style={{ width: '50vw' }} header="State Details" modal className="p-fluid" onHide={hideDialog}>
            <PincodeForm pincode={pincode} countries={countries} hideDialog={hideDialog} />
          </Dialog>
          <Dialog visible={confirmStateDeleteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={confirmPincodesDeleteDialogFooter} onHide={hideConfirmPincodesDeleteDialog}>
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              <span>Are you sure you want to delete the selected pincodes ?</span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PincodesTable;
