// 'use client';
// import { Button } from 'primereact/button';
// import { Column } from 'primereact/column';
// import { DataTable } from 'primereact/datatable';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { Toolbar } from 'primereact/toolbar';
// import React, { ChangeEvent, useRef, useState } from 'react';
// import StateForm from '@/src/app/(main)/manage-locations/states/state-form';
// import { FilterMatchMode } from 'primereact/api';
// // import { deleteState } from '@/src/app/(main)/manage-locations/states/state-actions';
// import { IState, IStateForm } from '@/src/_models/state.model';
// import { ICountry, ICountrySelect } from '@/src/_models/country.model';

// const StatesTable = ({ states, countries }: { states: IState[]; countries: ICountrySelect[] }) => {
//   const emptyState: IStateForm = { id: '', name: '', stateCode: '',
//      countryId: ''
//      };
//   const [stateDialog, setStateDialog] = useState(false);
//   const [state, setState] = useState<IStateForm>(emptyState);
//   const [selectedStates, setSelectedStates] = useState<IState[]>([]);
//   const [confirmStateDeleteDialog, setConfirmStateDeleteDialog] = useState<boolean>(false);
//   const [filters, setFilters] = useState({
//     global: { value: null, matchMode: FilterMatchMode.CONTAINS }
//   });
//   const [globalFilter, setGlobalFilter] = useState('');
//   const dt = useRef<DataTable<IState[]>>(null);

//   const openNew = () => {
//     setState({ ...emptyState });
//     setStateDialog(true);
//   };

//   const hideDialog = () => {
//     setStateDialog(false);
//   };

//   const editState = (state: IState) => {
//     setState({ ...state });
//     setStateDialog(true);
//   };

//   const deleteStateConfirm = (state: IState) => {
//     setSelectedStates([state]);
//     setConfirmStateDeleteDialog(true);
//   };

//   const exportCSV = () => {
//     dt.current?.exportCSV();
//   };

//   const confirmDelete = () => {
//     setConfirmStateDeleteDialog(true);
//   };

//   const leftToolbarTemplate = () => {
//     return (
//       <React.Fragment>
//         <div className="my-2">
//           <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
//           <Button label="Delete" icon="pi pi-trash" severity="danger" className=" mr-2" onClick={confirmDelete} disabled={!selectedStates || !selectedStates.length} />
//         </div>
//       </React.Fragment>
//     );
//   };

//   const rightToolbarTemplate = () => {
//     return (
//       <React.Fragment>
//         {/*<FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />*/}
//         <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
//       </React.Fragment>
//     );
//   };

//   const idBodyTemplate = (rowData: IState) => {
//     return (
//       <>
//         <span className="p-column-title">Id</span>
//         {rowData.id}
//       </>
//     );
//   };

//   const nameBodyTemplate = (rowData: IState) => {
//     return (
//       <>
//         <span className="p-column-title">Name</span>
//         {rowData.name}
//       </>
//     );
//   };

//   const actionBodyTemplate = (rowData: IState) => {
//     return (
//       <>
//         <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editState(rowData)} />
//         <Button icon="pi pi-trash" rounded severity="danger" className="mr-2" onClick={() => deleteStateConfirm(rowData)} />
//       </>
//     );
//   };

//   const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     let _filters: any = { ...filters };

//     _filters.global.value = value;

//     setFilters(_filters);
//     setGlobalFilter(value);
//   };

//   const header = (
//     <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
//       <h5 className="m-0">Manage States</h5>
//       <span className="block mt-2 md:mt-0 p-input-icon-left">
//         <i className="pi pi-search" />
//         <InputText type="search" value={globalFilter} onChange={onGlobalFilterChange} placeholder="Search..." />
//       </span>
//     </div>
//   );

//   const hideConfirmStatesDeleteDialog = () => {
//     setConfirmStateDeleteDialog(false);
//   };

//   const deleteSelectedStates = () => {
//     if (!selectedStates) {
//       return;
//     }
//     deleteState(selectedStates.map((c) => c.id!))
//       .then(() => {})
//       .catch(() => {});
//   };

//   const confirmStatesDeleteDialogFooter = (
//     <React.Fragment>
//       <Button label="Delete" icon="pi pi-check" severity="danger" onClick={() => deleteSelectedStates()} />
//     </React.Fragment>
//   );

//   const headerTemplate = (data: IState) => {
//     return (
//       <div className="flex align-items-center gap-2">
//         <span className="font-bold">{data.country.name}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="grid crud-demo">
//       <div className="col-12">
//         <div className="card">
//           <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>

//           <DataTable
//             stripedRows
//             ref={dt}
//             rowGroupMode="subheader"
//             groupRowsBy="country.name"
//             rowGroupHeaderTemplate={headerTemplate}
//             selectionMode="multiple"
//             value={states}
//             selection={selectedStates}
//             onSelectionChange={(e) => setSelectedStates(e.value)}
//             dataKey="id"
//             paginator
//             rows={10}
//             rowsPerPageOptions={[5, 10, 25]}
//             className="datatable-responsive"
//             paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
//             currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
//             filters={filters}
//             globalFilterFields={['id', 'name', 'country.name']}
//             emptyMessage="No states found."
//             header={header}
//             exportFilename="States"
//           >
//             <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
//             <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
//             <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
//             <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} frozen={true}></Column>
//           </DataTable>

//           <Dialog visible={stateDialog} style={{ width: '50vw' }} header="State Details" modal className="p-fluid" onHide={hideDialog}>
//             <StateForm state={state} countries={countries} hideDialog={hideDialog} />
//           </Dialog>
//           <Dialog visible={confirmStateDeleteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={confirmStatesDeleteDialogFooter} onHide={hideConfirmStatesDeleteDialog}>
//             <div className="confirmation-content">
//               <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
//               <span>Are you sure you want to delete the selected states ?</span>
//             </div>
//           </Dialog>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatesTable;
