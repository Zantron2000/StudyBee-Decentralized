import Header from "../Header"
import MobileHeader from "../MobileHeader"
import Footer from "../Footer"
import EditSet from "../Set/Edit/EditSet"

function EditSetPage({ set, setSet }) {
    return (
        <>
            <MobileHeader />
            <Header />
            <EditSet set={set} setSet={setSet} />
            <Footer />
        </>
    )
}

export default EditSetPage
