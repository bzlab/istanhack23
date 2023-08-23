import Wallet from "./components/Wallet";
import { Navbar } from "./components/Navbar";
import Onboard from "./components/Onboard";
import { InsuranceApplyForm } from "./components/InsurenceApplyForm";
import { InsureAssetForm } from "./components/InsureAssetForm";
import { Events } from "./components/Events";

function App() {
  return (
    <>
      <Navbar />
      <Wallet />
      <Onboard />
      <InsuranceApplyForm />
      <Events />
      <InsureAssetForm />
    </>
  );
}

export default App;
