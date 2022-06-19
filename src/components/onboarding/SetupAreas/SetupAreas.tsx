import Card from '@/components/Card/Card'
import Input from '@/components/global/Form/Input'
import Button from '@/components/global/Button/Button'
import Container from '../Container'
import styles from '../OnBoarding.module.css'
import DataList from '@/components/global/DataList/DataList'
import DeleteIcon from '@/components/global/DeleteIcon/DeleteIcon'
import useOnBoarding from '@/hooks/useOnBoarding'
import React, { useContext, useRef, useState } from 'react'
import { ReactComponent as NoDataSvg } from '@/assets/nodata.svg'
import { StepContextType, StepsContext } from '@/context/StepsContext'

const SetupAreas = () => {
  const { listAreas, addArea, removeArea } = useOnBoarding()
  const [inputValue, setInputValue] = useState<string>('')
  const ref = useRef<HTMLInputElement>(null)
  const { nextStep } = useContext(StepsContext) as StepContextType

  const buttonsGenerator = [
    (value: string, name = 'delete') => {
      return <DeleteIcon onClick={() => removeArea(value)} key={name} />
    },
  ]

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onClickHandler = () => {
    if (inputValue) {
      addArea(inputValue)
      setInputValue('')
    }
    if (ref.current) ref.current.focus()
  }

  return (
    <Container>
      <Card title='Configura las áreas'>
        <div className={styles['column-content']}>
          <div className={styles['input-group']}>
            <Input
              placeholder='Área'
              ref={ref}
              value={inputValue}
              onChange={onChangeHandler}
            />
            <Button onClick={onClickHandler}>Añadir</Button>
          </div>
          {listAreas && (
            <div className={styles['data-container']}>
              <DataList label={listAreas} buttons={buttonsGenerator} />
              <Button onClick={nextStep} aditionalStyle={styles.button}>
                Siguiente
              </Button>
            </div>
          )}
          {!listAreas && (
            <div className={styles['svg-container']}>
              <NoDataSvg className={styles.svg} />
            </div>
          )}
        </div>
      </Card>
    </Container>
  )
}

export default SetupAreas
