import React from "react"
import Modal from "../Modal"
import { CustomAlert } from "components/SearchModal/CustomAlert"

export default function CustomAlertModal({
  isOpen,
  onConfirm,
  alertHeader,
  alertText,
  alertTitle,
  alertBody,
  links,
  buttonText,
}: {
  alertHeader: string
  alertText: string
  alertTitle: string
  alertBody: string
  buttonText: string
  links: Array<string>
  isOpen: boolean
  onConfirm: () => void
}) {
  return (
    <Modal isOpen={isOpen} onDismiss={onConfirm} maxHeight={100}>
      <CustomAlert
        alertHeader={alertHeader}
        alertText={alertText}
        alertTitle={alertTitle}
        alertBody={alertBody}
        buttonText={buttonText}
        links={links}
        onConfirm={onConfirm}
      />
    </Modal>
  )
}
