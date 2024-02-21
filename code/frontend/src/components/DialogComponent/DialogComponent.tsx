import { cleanDialogId } from "../../redux/features/dialogSlice/dialogSlice";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hook";

interface DialogInterface {
  deleteCallBack: (...args: any[]) => any;
}

const DialogComponent = ({ deleteCallBack }: DialogInterface) => {
  const dispatch = useAppDispatch();

  const { id } = useAppSelector((state) => state.dialog);

  const onClickConfirm = async () => {
    await deleteCallBack(id);

    dispatch(cleanDialogId());
  };

  const onClick = () => {
    dispatch(cleanDialogId());
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">Are you sure you want to delete ?</p>
          <form method="dialog">
            <div className="flex justify-end gap-2">
              <button className="btn btn-active btn-neutral" onClick={onClick}>
                Cancel
              </button>
              <button className="btn btn-warning" onClick={onClickConfirm}>
                Confirm
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={onClick}>
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
};

export default DialogComponent;
