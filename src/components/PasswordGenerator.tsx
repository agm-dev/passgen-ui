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
  IonTextarea,
  IonAlert,
} from '@ionic/react';
import {
  skullOutline,
  shieldCheckmarkOutline,
  sadOutline,
} from "ionicons/icons"
import{ generatePass } from "../passgen.bundle"
import copy from "copy-to-clipboard"

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
    console.log("[passgen]", data)
    setPassword(pass)
    setEntropy(entropy)
    setRelativeEntropy(relativeEntropy)
    setStrength(strength)
    setRelativeStrength(relativeStrength)

    copyToClipboard(pass)
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
              <IonLabel>Length {password.length}</IonLabel>
            </IonChip>
            <EntropyChip
              text="Entropy"
              value={`${Math.round(entropy * 100) / 100}`}
              description="Password entropy is a measurement of how unpredictable a password is."
            ></EntropyChip>
            <StrengthChip
              text="Strength"
              value={strength}
              description="Describes the strength of the generated password against generic brute force attacks."
            ></StrengthChip>
            {["words-es", "words-en", "pokemon-1st"].includes(type) && (
              <>
                <EntropyChip
                  text="Relative entropy"
                  value={`${Math.round(relativeEntropy * 100) / 100}`}
                  description="Password entropy is a measurement of how unpredictable a password is. In this case it is calculated considering that each word is a unique character, since it is really being used in that way in the password generation."
                ></EntropyChip>
                <StrengthChip
                  text="Relative strength"
                  value={relativeStrength}
                  description="Describes the strength of the generated password against specific brute force attacks that know the password was generated with this application."
                ></StrengthChip>
              </>
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

const copyToClipboard = (text: string): boolean => copy(text)

interface ChipProps {
  text: string
  value: string
  description: string
}
const StrengthChip: React.FC<ChipProps> = ({ text, value, description }) => {
  const [showAlert, setShowAlert] = useState(false)
  return (
    <>
      <IonChip onClick={() => setShowAlert(true)}>
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
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass="chip-description"
        header={text}
        message={description}
        buttons={["OK"]}
      ></IonAlert>
    </>
  )
}

const EntropyChip: React.FC<ChipProps> = ({ text, value, description }) => {
  const [showAlert, setShowAlert] = useState(false)
  return (
    <>
      <IonChip onClick={() => setShowAlert(true)}>
        <IonLabel>{text} {value}</IonLabel>
      </IonChip>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass="chip-description"
        header={text}
        message={description}
        buttons={["OK"]}
      ></IonAlert>
    </>
  )
}
