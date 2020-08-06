import React, { useState } from 'react';
import './ExploreContainer.css';
import {
  IonList,
  IonItem,
  IonButton,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonRange
} from '@ionic/react';
import{ generatePass } from "../passgen.bundle"

type PassType = "alpha" | "num" | "alphanum" | "alphanumExt" | "words-es" | "words-en" | "pokemon-1st"

type PassStrength = "very weak" | "weak" | "reasonable" | "strong" | "very strong" | "overkill"

interface PassOptions {
  type: PassType
  number: number
  caps: boolean
}

interface PassData extends PassOptions {
  pass: string
  entropy: number
  strength: PassStrength
  relativeEntropy: number
  relativeStrength: PassStrength
}

interface ContainerProps { }

const PasswordGenerator: React.FC<ContainerProps> = () => {
  const types = ["alpha", "num", "alphanum", "alphanumExt", "words-es", "words-en", "pokemon-1st"]
  const [password, setPassword] = useState("")
  const [type, setType] = useState("words-es")
  const [number, setNumber] = useState(8)

  const generate = () => {
    const data = generatePass({
      type,
      number,
      caps: true,
    })
    const { pass } = data
    console.log("test", pass)
    setPassword(pass)
  }

  return (
    <IonList>
      <IonRadioGroup value={type} onIonChange={e => setType(e.detail.value)}>
        {types.map(item => (
          <IonItem key={item}>
            <IonLabel>{item}</IonLabel>
            <IonRadio slot="start" value={item}></IonRadio>
          </IonItem>
        ))}
      </IonRadioGroup>
      <IonItem lines="none">
        <IonRange
          min={4}
          max={100}
          value={number}
          onIonChange={e => setNumber(e.detail.value as number)}
          debounce={200}
          step={1}
          pin
          snaps
          ticks
        >
          <IonLabel slot="start">0</IonLabel>
          <IonLabel slot="end">100</IonLabel>
        </IonRange>
      </IonItem>
      <IonItem lines="none">
        <IonButton
          size="default"
          onClick={() => generate()}
        >Generate Random Password</IonButton>
      </IonItem>
      <IonItem lines="none">
        <IonInput type="text" value={password} disabled></IonInput>
      </IonItem>
    </IonList>
  );
};

export default PasswordGenerator;
