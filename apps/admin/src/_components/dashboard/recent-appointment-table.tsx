'use client';
import { apiClient } from '@/src/trpc/react';
import { format } from 'date-fns';
import { usePathname, useSearchParams } from 'next/navigation';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';

interface IRecentAppointments {
  id: string;
  patient: {
    firstName: string;
    email: string;
    additionalPatients: {
      firstName: string;
      email: string;
    };
  };
  professionalUser: {
    firstName: string;
    email: string;
  };
  startingTime: Date;
  endingTime: Date;
  priceInCents : number ;
}

const RecentAppointmentTable = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    setStartDate(searchParams.get('startDate') ?? '');
    setEndDate(searchParams.get('endDate') ?? '');
  }, [searchParams]);
  const { data } = apiClient.noOfOnlineAppointments.noOfOnlineAppointments.useQuery({
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  });
  console.log('data', data);
  console.log('start date', searchParams.get('startDate'));

  const doctorBodyTemplate = (row: IRecentAppointments) => {
    return (
      <>
        <div className="text-sm flex flex-column gap-2">
          <div>{row.professionalUser.firstName}</div>
          <div>{row.professionalUser.email}</div>
        </div>
      </>
    );
  };
  const patientNameTemplate = (row: IRecentAppointments) => {
    return (
      <>
        <div className="text-sm flex flex-column gap-2">
          <div>{row.patient.firstName}</div>
          <div>{row.patient.email}</div>
          <div>{row.patient.additionalPatients.firstName}</div>
          <div>{row.patient.additionalPatients.email}</div>
        </div>
      </>
    );
  };

  const appointmentDateTemplate = (row: IRecentAppointments) => {
    return (
      <>
        <div className="text-sm flex gap-2">
          <span>{format(new Date(row.startingTime), 'dd/MM/yyyy')}</span>
          <span>{format(new Date(row.startingTime), "hh:mm a")} - {format(new Date(row.endingTime), "hh:mm a.")}</span>
        </div>
      </>
    );
  };

  const priceTemplate = (row : IRecentAppointments) => {
    return(
      <>
      <div className='text-sm '>  {(row.priceInCents/100).toString()}
      </div>
      </>
    )
  }

 

  return (
    <>
      <div className="card">
        <div>
          <h5>Recent Appointment Table</h5>
        </div>
        <DataTable stripedRows value={data?.appointmentDataForTable} rows={5} paginator scrollable scrollHeight="500px">
          <Column field="professionalUser" header="Doctor Details" body={doctorBodyTemplate}></Column>
          <Column field="patient" header="Patient Details" body={patientNameTemplate}></Column>

          <Column field="startingDate" header="Appointment Details" body={appointmentDateTemplate}></Column>
          <Column field="priceInCents" header="Price" body={priceTemplate}></Column>
        </DataTable>
      </div>
    </>
  );
};
export default RecentAppointmentTable;
