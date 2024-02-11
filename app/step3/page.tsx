export default function Home() {
  return (
    <main className="main">
      <p>STEP 3</p>
    </main>
  );
}


import { useState } from 'react';
import { writable } from 'svelte/store';
import checkMarkImg from '../path/to/your/img/icon-checkmark.svg';
import { useRouter } from 'next/router';


export const onlineServiceAddOnIsAdded = writable(false);
export const monthlyIsSelected = writable(true);
export const largerStoreAddOnIsAdded = writable(false);
export const customizableProfileAddOnIsAdded = writable(false);

export default function Step3() {
  const router = useRouter();

  const [showComponent, setShowComponent] = useState(false);

  setTimeout(() => {
    setShowComponent(true);
  }, 0);

  const toggleOnlineServiceAddOn = () => {
    onlineServiceAddOnIsAdded.update(value => !value);
  };

  const toggleLargerStoreAddOn = () => {
    largerStoreAddOnIsAdded.update(value => !value);
  };


  const toggleCustomizableProfileAddOn = () => {
    customizableProfileAddOnIsAdded.update(value => !value);
  };

  const handleSubmit = () => {
    router.push('/nextStep'); 
  };

  return (
    <main>
      <FormSteps />
      <form className={`AddOns-form ${showComponent ? 'show' : ''}`}>
        <h3>Pick add-ons</h3>
        <p className="AddOns-description">Add-ons help enhance your gaming experience.</p>
        <div className="AddOns-container">
          {/* Online service add-on */}
          <button className={`AddOns-choice ${onlineServiceAddOnIsAdded ? 'selected' : ''}`} onClick={toggleOnlineServiceAddOn}>
            <div className={`checkBox ${onlineServiceAddOnIsAdded ? 'selected' : ''}`}>
              <img src={checkMarkImg} alt="" />
            </div>
            <div className="choice-info">
              <p className="choice-info-1">Online service</p>
              <p className="choice-info-2">Access to multiplayer games</p>
            </div>
            {monthlyIsSelected ? <p className="price">+$1/mo</p> : <p className="price">+$10/yr</p>}
          </button>

          {/* Larger store add-on */}
          <button className={`AddOns-choice ${largerStoreAddOnIsAdded ? 'selected' : ''}`} onClick={toggleLargerStoreAddOn}>
            <div className={`checkBox ${largerStoreAddOnIsAdded ? 'selected' : ''}`}>
              <img src={checkMarkImg} alt="" />
            </div>
            <div className="choice-info">
              <p className="choice-info-1">Larger storage</p>
              <p className="choice-info-2">Extra 1TB of cloud save</p>
            </div>
            {monthlyIsSelected ? <p className="price">+$2/mo</p> : <p className="price">+$20/yr</p>}
          </button>

          {/* Customizable profile add-on */}
          <button className={`AddOns-choice ${customizableProfileAddOnIsAdded ? 'selected' : ''}`} onClick={toggleCustomizableProfileAddOn}>
            <div className={`checkBox ${customizableProfileAddOnIsAdded ? 'selected' : ''}`}>
              <img src={checkMarkImg} alt="" />
            </div>
            <div className="choice-info">
              <p className="choice-info-1">Customizable profile</p>
              <p className="choice-info-2">Custom theme on your profile</p>
            </div>
            {monthlyIsSelected ? <p className="price">+$2/mo</p> : <p className="price">+$20/yr</p>}
          </button>
        </div>
        <button type="submit" onClick={handleSubmit}>Next Step</button>
      </form>
    </main>
  );
}
