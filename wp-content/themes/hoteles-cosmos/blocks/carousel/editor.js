import metadata from './block.json';

import {
    registerBlockType
} from '@wordpress/blocks';

import {
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    ColorPalette
} from '@wordpress/block-editor';

import {
    PanelBody,
    Button,
    RangeControl,
    SelectControl,
    ToggleControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

import './style.css';
import './editor.css';


function Edit({ attributes, setAttributes }) {

    const {
        items,

        textColor,
        textSize,
        textAlign,

        imageRadius,
        cardGap,

        desktopColumns,
        tabletColumns,
        mobileColumns,

        showArrows,

        arrowColor,
        arrowBackgroundColor,
        arrowSize,

        imageSize
    } = attributes;


    /*
     * =====================================================
     * ACTUALIZAR ITEM
     * =====================================================
     */

    const updateItem = (index, data) => {

        const newItems = [...items];

        newItems[index] = {
            ...newItems[index],
            ...data
        };

        setAttributes({
            items: newItems
        });
    };


    /*
     * =====================================================
     * AÑADIR ITEM
     * =====================================================
     */

    const addItem = () => {

        setAttributes({
            items: [
                ...items,
                {
                    id: 0,
                    url: '',
                    alt: '',
                    text: ''
                }
            ]
        });
    };


    /*
     * =====================================================
     * ELIMINAR ITEM
     * =====================================================
     */

    const removeItem = (index) => {

        const newItems = items.filter(
            (_, itemIndex) => itemIndex !== index
        );

        setAttributes({
            items: newItems
        });
    };


    /*
     * =====================================================
     * SELECCIONAR IMAGEN
     * =====================================================
     */

    const selectImage = (index, media) => {

        if (!media || !media.url) {
            return;
        }

        updateItem(index, {
            id: media.id || 0,
            url: media.url,
            alt: media.alt || ''
        });
    };


    /*
     * =====================================================
     * VARIABLES CSS
     * =====================================================
     */

    const blockProps = useBlockProps({

        className: 'cosmos-image-carousel',

        style: {

            '--cosmos-carousel-text-color':
                textColor,

            '--cosmos-carousel-text-size':
                `${textSize}px`,

            '--cosmos-carousel-text-align':
                textAlign,

            '--cosmos-carousel-image-radius':
                `${imageRadius}%`,

            '--cosmos-carousel-card-gap':
                `${cardGap}px`,

            '--cosmos-carousel-desktop-columns':
                desktopColumns,

            '--cosmos-carousel-tablet-columns':
                tabletColumns,

            '--cosmos-carousel-mobile-columns':
                mobileColumns,

            '--cosmos-carousel-arrow-color':
                arrowColor,

            '--cosmos-carousel-arrow-background':
                arrowBackgroundColor,

            '--cosmos-carousel-arrow-size':
                `${arrowSize}px`,

            '--cosmos-carousel-image-size':
                `${imageSize}%`
        }
    });


    /*
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (

        <Fragment>

            <InspectorControls>

                {/* =================================================
                    TEXTO
                ================================================= */}

                <PanelBody
                    title="Texto"
                    initialOpen={true}
                >

                    <p>
                        <strong>
                            Color del texto
                        </strong>
                    </p>

                    <ColorPalette
                        value={textColor}
                        onChange={(value) =>
                            setAttributes({
                                textColor:
                                    value || '#111111'
                            })
                        }
                    />


                    <RangeControl
                        label="Tamaño del texto"
                        value={textSize}
                        onChange={(value) =>
                            setAttributes({
                                textSize: value
                            })
                        }
                        min={10}
                        max={50}
                        step={1}
                    />


                    <SelectControl
                        label="Alineación del texto"
                        value={textAlign}
                        options={[
                            {
                                label: 'Izquierda',
                                value: 'left'
                            },
                            {
                                label: 'Centro',
                                value: 'center'
                            },
                            {
                                label: 'Derecha',
                                value: 'right'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                textAlign: value
                            })
                        }
                    />

                </PanelBody>


                {/* =================================================
                    IMÁGENES
                ================================================= */}

                <PanelBody
                    title="Imágenes"
                    initialOpen={false}
                >

                    <RangeControl
                        label="Border radius"
                        value={imageRadius}
                        onChange={(value) =>
                            setAttributes({
                                imageRadius: value
                            })
                        }
                        min={0}
                        max={50}
                        step={1}
                    />


                    <RangeControl
                        label="Tamaño de imagen"
                        value={imageSize}
                        onChange={(value) =>
                            setAttributes({
                                imageSize: value
                            })
                        }
                        min={50}
                        max={100}
                        step={1}
                    />


                    <RangeControl
                        label="Separación entre cards"
                        value={cardGap}
                        onChange={(value) =>
                            setAttributes({
                                cardGap: value
                            })
                        }
                        min={0}
                        max={100}
                        step={1}
                    />

                </PanelBody>


                {/* =================================================
                    RESPONSIVE
                ================================================= */}

                <PanelBody
                    title="Responsive"
                    initialOpen={false}
                >

                    <RangeControl
                        label="Cards en escritorio"
                        value={desktopColumns}
                        onChange={(value) =>
                            setAttributes({
                                desktopColumns: value
                            })
                        }
                        min={1}
                        max={5}
                        step={1}
                    />


                    <RangeControl
                        label="Cards en tablet"
                        value={tabletColumns}
                        onChange={(value) =>
                            setAttributes({
                                tabletColumns: value
                            })
                        }
                        min={1}
                        max={3}
                        step={1}
                    />


                    <RangeControl
                        label="Cards en móvil"
                        value={mobileColumns}
                        onChange={(value) =>
                            setAttributes({
                                mobileColumns: value
                            })
                        }
                        min={1}
                        max={2}
                        step={1}
                    />

                </PanelBody>


                {/* =================================================
                    FLECHAS
                ================================================= */}

                <PanelBody
                    title="Flechas"
                    initialOpen={false}
                >

                    <ToggleControl
                        label="Mostrar flechas"
                        checked={showArrows}
                        onChange={(value) =>
                            setAttributes({
                                showArrows: value
                            })
                        }
                    />


                    {showArrows && (

                        <Fragment>

                            <p>
                                <strong>
                                    Color de la flecha
                                </strong>
                            </p>

                            <ColorPalette
                                value={arrowColor}
                                onChange={(value) =>
                                    setAttributes({
                                        arrowColor:
                                            value || '#111111'
                                    })
                                }
                            />


                            <p>
                                <strong>
                                    Fondo de la flecha
                                </strong>
                            </p>

                            <ColorPalette
                                value={arrowBackgroundColor}
                                onChange={(value) =>
                                    setAttributes({
                                        arrowBackgroundColor:
                                            value || '#ffffff'
                                    })
                                }
                            />


                            <RangeControl
                                label="Tamaño de la flecha"
                                value={arrowSize}
                                onChange={(value) =>
                                    setAttributes({
                                        arrowSize: value
                                    })
                                }
                                min={24}
                                max={80}
                                step={1}
                            />

                        </Fragment>

                    )}

                </PanelBody>

            </InspectorControls>


            {/* =====================================================
                CARRUSEL
            ===================================================== */}

            <div {...blockProps}>

                <div className="cosmos-image-carousel__viewport">

                    {showArrows && (

                        <button
                            type="button"
                            className="
                                cosmos-image-carousel__arrow
                                cosmos-image-carousel__arrow-prev
                            "
                        >
                            ‹
                        </button>

                    )}


                    <div className="cosmos-image-carousel__track">

                        {items.map((item, index) => (

                            <div
                                className="cosmos-image-carousel__card"
                                key={index}
                            >

                                <MediaUploadCheck>

                                    <MediaUpload
                                        onSelect={(media) =>
                                            selectImage(
                                                index,
                                                media
                                            )
                                        }
                                        allowedTypes={['image']}
                                        value={item.id}
                                        render={({ open }) => (

                                            <div
                                                className="
                                                    cosmos-image-carousel__image-wrapper
                                                "
                                                onClick={open}
                                                role="button"
                                                tabIndex={0}
                                            >

                                                {item.url ? (

                                                    <img
                                                        src={item.url}
                                                        alt={item.alt}
                                                        className="
                                                            cosmos-image-carousel__image
                                                        "
                                                    />

                                                ) : (

                                                    <div
                                                        className="
                                                            cosmos-image-carousel__image-placeholder
                                                        "
                                                    >
                                                        Seleccionar imagen
                                                    </div>

                                                )}

                                            </div>

                                        )}
                                    />

                                </MediaUploadCheck>


                                <RichText
                                    tagName="div"
                                    className="
                                        cosmos-image-carousel__text
                                    "
                                    value={item.text}
                                    onChange={(value) =>
                                        updateItem(
                                            index,
                                            {
                                                text: value
                                            }
                                        )
                                    }
                                    placeholder="Escribe el texto..."
                                    allowedFormats={[]}
                                />


                                <Button
                                    isDestructive
                                    variant="secondary"
                                    onClick={() =>
                                        removeItem(index)
                                    }
                                    className="
                                        cosmos-image-carousel__remove
                                    "
                                >
                                    Eliminar
                                </Button>

                            </div>

                        ))}

                    </div>


                    {showArrows && (

                        <button
                            type="button"
                            className="
                                cosmos-image-carousel__arrow
                                cosmos-image-carousel__arrow-next
                            "
                        >
                            ›
                        </button>

                    )}

                </div>


                {/* =================================================
                    AÑADIR CARD
                ================================================= */}

                <div className="cosmos-image-carousel__add">

                    <Button
                        variant="primary"
                        onClick={addItem}
                    >
                        + Añadir tarjeta
                    </Button>

                </div>

            </div>

        </Fragment>
    );
}


registerBlockType(
    metadata.name,
    {
        ...metadata,
        edit: Edit,
        save: () => null
    }
);