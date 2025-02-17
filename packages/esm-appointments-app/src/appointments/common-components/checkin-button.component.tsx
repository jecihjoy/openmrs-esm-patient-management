import React from 'react';
import { Button } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { launchOverlay } from '../../hooks/useOverlay';
import VisitForm from '../../patient-queue/visit-form/visit-form.component';
import { MappedAppointment } from '../../types';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(isToday);

interface CheckInButtonProps {
  patientUuid: string;
  appointment: MappedAppointment;
}

const CheckInButton: React.FC<CheckInButtonProps> = ({ appointment, patientUuid }) => {
  const { t } = useTranslation();
  return (
    <>
      {(dayjs(appointment.dateTime).isAfter(dayjs()) || dayjs(appointment.dateTime).isToday()) && (
        <Button
          size="sm"
          kind="tertiary"
          onClick={() =>
            launchOverlay(
              t('patientSearch', 'Patient search'),
              <VisitForm patientUuid={patientUuid} appointment={appointment} />,
            )
          }>
          {t('checkIn', 'CheckIn')}
        </Button>
      )}
    </>
  );
};

export default CheckInButton;
