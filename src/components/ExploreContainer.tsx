import React, { useState } from 'react';
import './ExploreContainer.css';
import { IonItem, IonButton, IonInput } from '@ionic/react';
import { generatePass } from "../passgen.bundle"

interface ContainerProps { }

const PasswordGenerator: React.FC<ContainerProps> = () => {
  const [password, setPassword] = useState("")

  const generate = () => {
    const data = generatePass({
      type: "alpha",
      number: 10,
      caps: true,
    })
    const { pass } = data
    console.log("test", pass)
    setPassword(pass)
  }

  return (
    <div>
      <IonItem lines="none">
        <IonButton size="default" onClick={() => generate()}>Generate Random Password</IonButton>
      </IonItem>
      <IonItem lines="none">
        <IonInput type="text" value={password} disabled></IonInput>
      </IonItem>
    </div>
  );
};

export default PasswordGenerator;
