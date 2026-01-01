import SubmitButton from '@/src/_components/shared/submit-button';
import useToastContext from '@/src/_hooks/useToast';
import { ISessionCategory } from '@/src/_models/session-category.model';
import { ISession } from '@/src/_models/session.model';
import { SessionStatus } from '@prisma/client';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, useForm } from 'react-hook-form';
import { createSession, updateSession } from './session-actions';

type SessionFormProps = {
    hideDialog: () => void;
    session: ISession;
    categories: ISessionCategory[];
};

const SessionForm = ({ hideDialog, session, categories }: SessionFormProps) => {
    const { showToast } = useToastContext();
    const { control, handleSubmit } = useForm<ISession>({
        defaultValues: {
            ...session,
            startAt: session.startAt ? new Date(session.startAt) : undefined,
            endAt: session.endAt ? new Date(session.endAt) : undefined,
        }
    });

    const statusOptions = Object.values(SessionStatus).map((s) => ({ label: s, value: s }));
    const categoryOptions = categories.map((c) => ({ label: c.name, value: c.id }));

    const callServerAction = (data: ISession) => {
        if (session?.id) return updateSession({ ...data, id: session.id });
        else return createSession(data);
    };

    const submitForm = (data: ISession) => {
        return callServerAction(data)
            .then((resp) => {
                if (resp.error) {
                    showToast('error', 'Error', resp.error);
                }

                if (resp.message) {
                    showToast('success', 'Successful', resp.message);
                    hideDialog();
                }
            })
            .catch((err) => {
                showToast('error', 'Error', err.message);
                console.log(err);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)} noValidate={true}>
                {/* Field for title */}
                <div className="field">
                    <label htmlFor="title">Title</label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: 'Title is required.'
                            }
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <>
                                    <InputText
                                        className={classNames({
                                            'p-invalid': fieldState.error
                                        })}
                                        {...field}
                                        value={field.value || ''}
                                        autoFocus
                                    />
                                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                                </>
                            );
                        }}
                    />
                </div>

                {/* Field for slug */}
                <div className="field">
                    <label htmlFor="slug">Slug</label>
                    <Controller
                        name="slug"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: 'Slug is required.'
                            }
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <>
                                    <InputText
                                        className={classNames({
                                            'p-invalid': fieldState.error
                                        })}
                                        {...field}
                                        value={field.value || ''}
                                    />
                                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                                </>
                            );
                        }}
                    />
                </div>

                {/* Field for Category */}
                <div className="field">
                    <label htmlFor="categoryId">Category</label>
                    <Controller
                        name="categoryId"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: 'Category is required.'
                            }
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <>
                                    <Dropdown
                                        id={field.name}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        options={categoryOptions}
                                        optionLabel="label"
                                        placeholder="Select a Category"
                                        className={classNames({
                                            'p-invalid': fieldState.error
                                        })}
                                    />
                                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                                </>
                            );
                        }}
                    />
                </div>

                {/* Field for Status */}
                <div className="field">
                    <label htmlFor="status">Status</label>
                    <Controller
                        name="status"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: 'Status is required.'
                            }
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <>
                                    <Dropdown
                                        id={field.name}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        options={statusOptions}
                                        optionLabel="label"
                                        placeholder="Select a Status"
                                        className={classNames({
                                            'p-invalid': fieldState.error
                                        })}
                                    />
                                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                                </>
                            );
                        }}
                    />
                </div>

                <div className="formgrid grid">
                    {/* Field for startAt */}
                    <div className="field col">
                        <label htmlFor="startAt">Start Date & Time</label>
                        <Controller
                            name="startAt"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Start time is required.'
                                }
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <>
                                        <Calendar
                                            id={field.name}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.value)}
                                            showTime
                                            hourFormat="12"
                                            className={classNames({
                                                'p-invalid': fieldState.error
                                            })}
                                        />
                                        {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                                    </>
                                );
                            }}
                        />
                    </div>

                    {/* Field for endAt */}
                    <div className="field col">
                        <label htmlFor="endAt">End Date & Time</label>
                        <Controller
                            name="endAt"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'End time is required.'
                                }
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <>
                                        <Calendar
                                            id={field.name}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.value)}
                                            showTime
                                            hourFormat="12"
                                            className={classNames({
                                                'p-invalid': fieldState.error
                                            })}
                                        />
                                        {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                                    </>
                                );
                            }}
                        />
                    </div>
                </div>

                {/* Field for Price */}
                <div className="field">
                    <label htmlFor="price">Price</label>
                    <Controller
                        name="price"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: 'Price is required.'
                            }
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <>
                                    <InputNumber
                                        id={field.name}
                                        value={field.value}
                                        onValueChange={(e) => field.onChange(e.value)}
                                        mode="currency"
                                        currency="INR"
                                        locale="en-IN"
                                        className={classNames({
                                            'p-invalid': fieldState.error
                                        })}
                                    />
                                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                                </>
                            );
                        }}
                    />
                </div>

                <div className="flex flex-row gap-4 mt-4">
                    <Button label="Cancel" type="button" icon="pi pi-times" severity="danger" onClick={hideDialog} />
                    <SubmitButton label="Save" icon="pi pi-check" />
                </div>
            </form>
        </>
    );
};

export default SessionForm;
