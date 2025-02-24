import { Dialog, DialogContent } from "../ui/dialog"
interface Props {
    isOpen: boolean
    toggleModal: () => void
}
export const ConfirmModal = ({ isOpen, toggleModal }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
        <DialogContent>
                YOMGIRLAR
        </DialogContent>
    </Dialog>
  )
}

export default ConfirmModal