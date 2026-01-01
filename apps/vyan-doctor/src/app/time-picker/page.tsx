'use client'
import { TimeField, Label, DateInput, DateSegment } from 'react-aria-components';

const Time = () => {
    return (<>
        <TimeField>
            <Label>Event time</Label>
            <DateInput>
                {segment => <DateSegment segment={segment} />}
            </DateInput>
        </TimeField>
    </>)
}
export default Time