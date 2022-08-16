import { useAppDispatch, useAppSelector } from '@/redux/hooks/useRedux'
import {
  fetchOrders,
  initializeState,
  saveSettings,
  selectScreen,
} from '@/redux/slices/displaySlice'
import styles from './TopBar.module.css'
import { VscSettings } from 'react-icons/vsc'
import Select, { CSSObjectWithLabel } from 'react-select'
import React, { useEffect, useState } from 'react'
import Modal from '../global/Modal/Modal'
import Button from '../global/Button/Button'
import SelectB from '../global/Form/Select'
import Input from '../global/Form/Input'
import toast from 'react-hot-toast'
import { defaultTime } from '@/constants/constants'
import { AiOutlineMenu } from 'react-icons/ai'

const widths = [
  '100%',
  '90%',
  '80%',
  '70%',
  '60%',
  '50%',
  '40%',
  '30%',
  '20%',
  '10%',
]

const columnsNumber = [1, 2, 3, 4, 5, 6]

const customStyles = {
  container: (base: CSSObjectWithLabel) => ({
    ...base,
    width: '100%',
    flex: 'auto',
    margin: '0 auto',
    padding: '10px',
    color: 'black',
  }),
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: 'transparent',
    height: '40px',
    borderColor: '#787e888e',
  }),
  valueContainer: (base: CSSObjectWithLabel) => ({
    ...base,
    display: '-webkit-box',
    position: 'relative',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: '100%',
    height: '80%',
    overflowX: 'auto',
    padding: '0px',
  }),
  multiValue: (base: CSSObjectWithLabel) => ({
    ...base,
    width: 'fit-content',
  }),
}

const TopBar = () => {
  const { selectedScreens, screens, settings } = useAppSelector(
    (state) => state.display,
  )

  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(initializeState())
  }, [dispatch])

  useEffect(() => {
    dispatch(
      fetchOrders({
        isDone: false,
      }),
    )
  }, [dispatch, selectedScreens])

  const selectTab = (tab: string[]) => {
    dispatch(selectScreen(tab))
  }

  useEffect(() => {
    window.localStorage.setItem(
      'selectedScreens',
      JSON.stringify(selectedScreens),
    )
  }, [selectedScreens])

  const getOptions = () => {
    const options: { value: string; label: string }[] = []

    screens.forEach((screens) => {
      return screens.screens.forEach((screen) => {
        options.push({
          value: `${screens.area}: ${screen}`,
          label: `${screens.area}: ${screen}`,
        })
      })
    })

    return options
  }

  const getValues = () => {
    const values = selectedScreens.map((screen) => {
      return {
        value: `${screen.area}: ${screen.screen}`,
        label: `${screen.area}: ${screen.screen}`,
      }
    })
    return values
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    if (
      type === 'time1' &&
      Number(e.target.value) >= settings[e.target.name]?.time2
    ) {
      toast.error('Tiempo 1 debe ser menor que tiempo 2', {
        id: 'errorTime',
      })
    }

    if (
      type === 'time2' &&
      Number(e.target.value) <= settings[e.target.name]?.time1
    ) {
      toast.error('Tiempo 2 debe ser mayor que tiempo 1', {
        id: 'errorTime',
      })
    }

    const newSettings = {
      ...settings,
      [e.target.name]: { ...settings[e.target.name], [type]: e.target.value },
    }
    dispatch(saveSettings(newSettings))
    localStorage.setItem('screenSettings', JSON.stringify(newSettings))
  }

  const showModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <Modal title='Configuración' isOpen={isModalOpen}>
        <div className={styles['modal-settings']}>
          <div className={styles['group-settings']}>
            {selectedScreens.map((screen) => {
              const identifier = `${screen.area}: ${screen.screen}`
              const defaultTime1 =
                settings[identifier]?.time1 ?? defaultTime.time1
              const defaultTime2 =
                settings[identifier]?.time2 ?? defaultTime.time2
              return (
                <div className={styles['settings-container']} key={identifier}>
                  <h3>{`${screen.area}: ${screen.screen}`}</h3>
                  <SelectB
                    onChange={(e) => handleChange(e, 'width')}
                    value={settings[identifier]?.width}
                    name={identifier}
                    label='Ancho'
                    data={widths}
                  />
                  <SelectB
                    onChange={(e) => handleChange(e, 'columns')}
                    value={settings[identifier]?.columns}
                    name={identifier}
                    label='Columnas'
                    data={columnsNumber}
                  />
                  <div className={styles['input-container']}>
                    <Input
                      type='number'
                      min={0}
                      onChange={(e) => handleChange(e, 'time1')}
                      name={identifier}
                      value={defaultTime1}
                      placeholder='Tiempo 1'
                    />
                    <Input
                      type='number'
                      min={0}
                      onChange={(e) => handleChange(e, 'time2')}
                      value={defaultTime2}
                      name={identifier}
                      placeholder='Tiempo 2'
                    />
                    <p>0</p>
                    <span></span>
                    <p>{defaultTime1}</p>
                    <span></span>
                    <p>{defaultTime2}</p>
                    <span></span>
                    <p>∞</p>
                  </div>
                </div>
              )
            })}
          </div>

          <Button aditionalStyle={styles['button-warning']} onClick={showModal}>
            Cerrar
          </Button>
        </div>
      </Modal>
      <div className={styles.bar}>
        <AiOutlineMenu className={styles.icon} />
        <Select
          value={getValues()}
          options={getOptions()}
          onChange={(values) => {
            selectTab(values.map(({ label }) => label))
          }}
          isMulti
          isClearable={false}
          isSearchable={false}
          placeholder='Selecciona pantalla'
          styles={customStyles}
        />
        <VscSettings className={styles.icon} onClick={showModal} />
      </div>
    </>
  )
}

export default TopBar
