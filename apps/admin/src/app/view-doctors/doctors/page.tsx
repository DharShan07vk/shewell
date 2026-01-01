'use client';
import { env } from '@/env';
import { apiClient } from '@/src/trpc/react';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

interface IRecentAppointments {
  firstName: string;
  email: string;
  createdAt: Date;
  phoneNumber: string;
  userName: string;
  displayQualification: {
    specialization: string;
  };
}

const Doctors = () => {
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'displayQualification.specialization': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
      </div>
    );
  };
  const { data } = apiClient.totalOnlineAppointments.totalOnlineAppointments.useQuery();
  const doctorNameTemplate = (row: IRecentAppointments) => {
    return (
      <>
        <Link target="_blank" href={`${env.NEXT_PUBLIC_USER}/counselling/${row.userName}`} className="text-sm">
          {row.firstName}
        </Link>
      </>
    );
  };
  const doctorEmailTemplate = (row: IRecentAppointments) => {
    return (
      <>
        <div className="text-sm">{row.email}</div>
      </>
    );
  };
  const doctorPhoneNumberTemplate = (row: IRecentAppointments) => {
    return (
      <>
        <div className="text-sm">{row.phoneNumber}</div>
      </>
    );
  };
  const doctorDateOfJoiningTemplate = (row: IRecentAppointments) => {
    return (
      <>
        <div className="text-sm">{format(row.createdAt, 'dd-MM-yyyy')}</div>
      </>
    );
  };
  const doctorDateSpecialityTemplate = (row: IRecentAppointments) => {
    return (
      <>
        <div className="text-sm">{row.displayQualification?.specialization}</div>
      </>
    );
  };
  const header = renderHeader();

  return (
    <>
      <div className="card">
        <div>
          <h5>View Doctor Details</h5>
        </div>
        <DataTable value={data?.professionalUsers} filters={filters} globalFilterFields={['firstName', 'displayQualification.specialization']} paginator rows={6} header={header}>
          <Column field="professionalUser" header="Doctor Name" body={doctorNameTemplate}></Column>
          <Column field="professionalUser" header="Doctor Email" body={doctorEmailTemplate}></Column>
          <Column field="professionalUser" header="Doctor Phone Number" body={doctorPhoneNumberTemplate}></Column>
          <Column field="professionalUser" header="Doctor's Joining Date" body={doctorDateOfJoiningTemplate}></Column>
          <Column field="professionalUser" header="Doctor Speciality" body={doctorDateSpecialityTemplate}></Column>
        </DataTable>
      </div>
    </>
  );
};
export default Doctors;
