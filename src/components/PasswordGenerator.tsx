import React, { useState } from 'react';
import './PasswordGenerator.css';
import {
  IonList,
  IonItem,
  IonButton,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonRange,
  IonToggle,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonIcon,
  IonToast,
  IonText,
  IonTextarea
} from '@ionic/react';
import {
  skullOutline,
  shieldCheckmarkOutline,
  sadOutline,
} from "ionicons/icons"
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
  const [caps, setCaps] = useState(false)
  const [entropy, setEntropy] = useState(0)
  const [relativeEntropy, setRelativeEntropy] = useState(0)
  const [strength, setStrength] = useState("")
  const [relativeStrength, setRelativeStrength] = useState("")
  const [showToast, setShowToast] = useState(false)

  const generate = () => {
    const data = generatePass({
      type,
      number,
      caps,
    })
    const { pass, entropy, strength, relativeEntropy, relativeStrength } = data
    console.log("generated", data)
    setPassword(pass)
    setEntropy(entropy)
    setRelativeEntropy(relativeEntropy)
    setStrength(strength)
    setRelativeStrength(relativeStrength)

    copyToClipboard(password)
    setShowToast(true)
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem lines="none" className="description">
            <IonText>
              Generate <strong>{type}</strong> password using <strong>{number}</strong> elements with random caps <strong>{caps ? "enabled" : "disabled"}</strong>.
            </IonText>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton
            size="default"
            onClick={() => generate()}
          >Generate Random Password</IonButton>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonTextarea
            className={`password ${strength.replace(" ", "-")}`}
            value={password}
            readonly
          >
          </IonTextarea>
        </IonCol>
      </IonRow>

      {!!password.length && (
        <IonRow>
          <IonCol>
            <IonChip>
              <IonLabel>Entropy {Math.round(entropy * 100) / 100}</IonLabel>
            </IonChip>
            <StrengthChip
              text="Strength"
              value={strength}
            ></StrengthChip>
            {["words-es", "words-en", "pokemon-1st"].includes(type) && (
              <div>
                <IonChip>
                  <IonLabel>Relative entropy {Math.round(relativeEntropy * 100) / 100}</IonLabel>
                </IonChip>
                <StrengthChip
                  text="Relative strength"
                  value={relativeStrength}
                ></StrengthChip>
              </div>
            )}
          </IonCol>
        </IonRow>
      )}

      <IonRow>
        <IonCol>
          <IonList>
            <IonItem lines="none">
              <IonLabel>Type of password</IonLabel>
            </IonItem>
            <IonRadioGroup value={type} onIonChange={e => setType(e.detail.value)}>
              {types.map(item => (
                <IonItem key={item}>
                  <IonLabel>{item}</IonLabel>
                  <IonRadio slot="start" value={item}></IonRadio>
                </IonItem>
              ))}
            </IonRadioGroup>
          </IonList>
        </IonCol>
        <IonCol>
          <IonList>
            <IonItem lines="none">
              <IonText>Number of elements to be included in the password.</IonText>
            </IonItem>
            <IonItem lines="none">
              <IonRange
                min={4}
                max={100}
                value={number}
                onIonChange={e => setNumber(e.detail.value as number)}
                debounce={100}
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
              <IonLabel>Random caps</IonLabel>
              <IonToggle
                slot="start"
                checked={caps}
                onIonChange={e => setCaps(e.detail.checked)}
              ></IonToggle>
            </IonItem>
          </IonList>
        </IonCol>
      </IonRow>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Password copied to clipboard!"
        duration={400}
      ></IonToast>
    </IonGrid>
  );
};

export default PasswordGenerator;

const copyToClipboard = (text: string): void => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

interface StrengthChipProps {
  text: string
  value: string
}
const StrengthChip: React.FC<StrengthChipProps> = ({ text, value }) => {
  return (
    <IonChip>
      {["strong", "very strong", "overkill"].includes(value) && (
        <IonIcon icon={shieldCheckmarkOutline}></IonIcon>
      )}
      {["reasonable"].includes(value) && (
        <IonIcon icon={sadOutline}></IonIcon>
      )}
      {["very weak", "weak"].includes(value) && (
        <IonIcon icon={skullOutline}></IonIcon>
      )}
      <IonLabel>{text}: {value}</IonLabel>
    </IonChip>
  )
}
