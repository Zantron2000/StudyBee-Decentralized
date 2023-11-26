import { useParams, useNavigate } from "react-router-dom";
import NavigationManager from "../utils/Managers/NavigationManager";

function SetOptions({ open, setOpen, manager, set }) {
    const { setHash } = useParams();
    const nav = useNavigate();
    const navigationManager = new NavigationManager(nav);

    if (!open) {
        return null;
    }

    const deleteSet = async () => {
        await manager.deleteSet(setHash);
        navigationManager.navigateHome();
    };

    const editSet = () => {
        navigationManager.navigateSetEdit(setHash, { set });
    }

    return (
        <div className="fixed bg-black/50 w-screen h-screen z-10 top-0 left-0 flex justify-center items-center">
            <div className="bg-primary-background w-1/2 h-1/2 rounded-lg border p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <div></div>
                    <div className="text-lg">Set Options</div>
                    <button className="bg-secondary-button p-2 rounded-lg" onClick={() => setOpen(false)}>Close</button>
                </div>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <button
                        className="w-[75%] bg-primary-button rounded-lg py-2"
                        onClick={deleteSet}
                    >
                        Delete Set
                    </button>
                    <button
                        className="w-[75%] bg-primary-button rounded-lg py-2"
                        onClick={editSet}
                    >
                        Edit Set
                    </button>
                    <button className="w-[75%] bg-primary-button rounded-lg py-2" disabled >Export Set</button>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default SetOptions;
