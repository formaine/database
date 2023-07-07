import React, {useState }from "react";
import Toggle from "react-toggle";
import {AiOutlineInfoCircle} from "react-icons/ai";
import Modal from "react-modal";
import {MdOpacity} from "react-icons/md";

import './layerStyles.css'

const Layer = ({ onSliderChange,
                 sliderChangeValue,
                 onToggleChange,
                 layerTitle,
                 sourceDetails,
                 layerDescription,
                 defaultChecked,
                 layerToTop}) => {


    const [hideSlider, setHideSlider] = useState(false)




    const [modalIsOpen,setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        console.log('opened')
    }

    function closeModal(){
        setIsOpen(false);
    }

    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0 , 0.5)'
        },
        content: {
            position: 'absolute',
            zIndex: 1000,
            top: '30vh',
            left: '30vw',
            right: '30vw',
            bottom: '30vh',
            border: '1px solid #ccc',
            background: '#ffffff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
        }
    };



    return (
        <div style={{float:'left', width: '100%'}}>
        <label style={{float:'inherit',
            display: 'inline-block',
            'verticalAlign':'top',
            'width': '70%'}}>
            <Toggle
                icons={false}
                defaultChecked={defaultChecked}
                onChange={onToggleChange}
            />
            <div id='label' style={{
                display: 'inline-block',
                'verticalAlign':'top',
                width: '70%',
                paddingLeft: '5px',
                'wordWrap': 'break-word'}}>
                {layerTitle}
            </div>
        </label>

        <span style={{float: 'right',
            display: 'inline-block',
            verticalAlign: 'top'}}>
                              <span>
                                  <AiOutlineInfoCircle
                                      className={'modalToggle'}
                                      onClick={openModal}  />
                                  <Modal
                                      isOpen={modalIsOpen}
                                      onAfterOpen={afterOpenModal}
                                      onRequestClose={closeModal}
                                      style={modalStyles}
                                      contentLabel="Layer A"
                                  >
                                  <h1>{layerTitle}</h1>
                                      <h4>Description</h4>
                                        <p>{layerDescription}</p>
                                      <h4>Source</h4>
                                        <p>{sourceDetails}</p>
                                  </Modal>
                              </span>

                              <MdOpacity className={'opacityToggle'}
                                         onClick={() => setHideSlider(!hideSlider)}
                              />
                              <svg onClick={layerToTop} className={'layerToTopGroup'}>
                              <path
                                  className={'layerToTop'}
                                  d="M16 99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path>
                                  <path
                                      className={'layerToBottom'}
                                      d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5  3z"></path>

                              </svg>

                          </span>

            {hideSlider ?

                  <div className="slider">
                      <input
                          id="slider"
                          type="range"
                          min="0"
                          max="100"
                          value={sliderChangeValue}
                          onChange={onSliderChange}
                          step="0"
                          style={{width: '75%'}}
                      />
                      <span id="slider-value">{sliderChangeValue}%</span>
                  </div>
                :
                null
            }
    </div>
    )


}

export default Layer;
