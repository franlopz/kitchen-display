import Card from '@/components/Card/Card'
import Button from '@/components/global/Button/Button'
import DataList from '@/components/global/DataList/DataList'
import DeleteIcon from '@/components/global/DeleteIcon/DeleteIcon'
import Input from '@/components/global/Form/Input'
import useOnBoarding, { ScreenObject } from '@/hooks/useOnBoarding'
import React, { useContext, useRef, useState } from 'react'
import Container from '../Container'
import styles from '../OnBoarding.module.css'
import { ReactComponent as ScreenSvg } from '@/assets/screen.svg'
import Select from '@/components/global/Form/Select'
import { StepContextType, StepsContext } from '@/context/StepsContext'

const SetupScreens = () => {
  const { listAreas, listScreens, addScreen, removeScreen } = useOnBoarding()
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedValue, setSelectedValue] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  const { nextStep, previousStep } = useContext(StepsContext) as StepContextType

  const buttonsGenerator = [
    (value: string, name = 'delete') => {
      return <DeleteIcon onClick={() => removeScreen(value)} key={name} />
    },
  ]

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.target.name === 'input') setInputValue(e.target.value)
    if (e.target.name === 'select') setSelectedValue(e.target.value)
  }

  const onClickHandler = () => {
    if (inputValue && selectedValue) {
      addScreen([selectedValue, inputValue])
      setInputValue('')
    }
    if (ref.current) ref.current.focus()
  }

  const getLabels = (data: ScreenObject) => {
    const labels = []
    // const entires = Object.entries(data)
    const keys = Object.keys(data)
    for (const key of keys) {
      const values = data[key]
      for (const value of values) {
        labels.push(`${key} > ${value}`)
      }
    }
    return labels
  }
  return (
    <Container>
      <Card title='Configura las pantallas'>
        <div className={styles['column-content']}>
          <div className={styles['input-group']}>
            <Select
              label='Area'
              name='select'
              onChange={onChangeHandler}
              value={selectedValue}
              data={listAreas}
            />
            <Input
              variantStyle={styles['fix-height']}
              name='input'
              placeholder='Pantalla'
              ref={ref}
              value={inputValue}
              onChange={onChangeHandler}
            />
            <Button
              aditionalStyle={styles['fix-height']}
              onClick={onClickHandler}
            >
              Añadir
            </Button>
          </div>
          {listScreens && (
            <div className={styles['data-container']}>
              <DataList
                label={getLabels(listScreens)}
                buttons={buttonsGenerator}
              />
              <div className={styles['buttons-container']}>
                <Button onClick={previousStep} aditionalStyle={styles.button}>
                  Atrás
                </Button>
                <Button onClick={nextStep} aditionalStyle={styles.button}>
                  Siguiente
                </Button>
              </div>
            </div>
          )}
          {!listScreens && (
            <div className={styles['svg-container']}>
              <ScreenSvg className={styles.svg} />
            </div>
          )}
        </div>
      </Card>
    </Container>
  )
}

export default SetupScreens
