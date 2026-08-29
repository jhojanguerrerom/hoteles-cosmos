import { registerBlockType } from '@wordpress/blocks';

import { __ } from '@wordpress/i18n';

import {
    useBlockProps,
    RichText,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls
} from '@wordpress/block-editor';

import {
    PanelBody,
    Button,
    TextControl,
    RangeControl,
    SelectControl,
    ColorPicker,
    ToggleControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';


function Edit({ attributes, setAttributes }) {

    const {
        cards,
        marginTop,
        marginBottom,
        cardGap,
        imageAspectRatio,
        overlay,
        ctaWidth,
        ctaBorderWidth,
        ctaBorderRadius,
        ctaColor,
        ctaBackground,
        ctaText
    } = attributes;


    /*
     * =====================================================
     * ACTUALIZAR CARD
     * =====================================================
     */

    const updateCard = (index, changes) => {

        const newCards = [...cards];

        newCards[index] = {
            ...newCards[index],
            ...changes
        };

        setAttributes({
            cards: newCards
        });

    };


    /*
     * =====================================================
     * AGREGAR CARD
     * =====================================================
     */

    const addCard = () => {

        setAttributes({

            cards: [

                ...cards,

                {
                    imageId: 0,
                    imageUrl: '',
                    imageAlt: '',

                    text: '',

                    textColor: '#ffffff',
                    textSize: 20,
                    textAlign: 'left',
                    textBold: false,

                    ctaUrl: ''
                }

            ]

        });

    };


    /*
     * =====================================================
     * ELIMINAR CARD
     * =====================================================
     */

    const removeCard = (index) => {

        const newCards = cards.filter(
            (_, cardIndex) =>
                cardIndex !== index
        );

        setAttributes({
            cards: newCards
        });

    };


    /*
     * =====================================================
     * IMAGEN
     * =====================================================
     */

    const selectImage = (index, media) => {

        if (!media || !media.url) {
            return;
        }

        updateCard(index, {

            imageId: media.id,

            imageUrl: media.url,

            imageAlt:
                media.alt ||
                media.title ||
                ''

        });

    };


    /*
     * =====================================================
     * ELIMINAR IMAGEN
     * =====================================================
     */

    const removeImage = (index) => {

        updateCard(index, {

            imageId: 0,

            imageUrl: '',

            imageAlt: ''

        });

    };


    /*
     * =====================================================
     * PROPIEDADES DEL BLOQUE
     * =====================================================
     */

    const blockProps = useBlockProps({

        className:
            'cosmos-card-grid'

    });


    return (

        <Fragment>


            {/* =================================================
               CONTROLES GENERALES
            ================================================= */}

            <InspectorControls>


                <PanelBody
                    title={__(
                        'Configuración general',
                        'hoteles-cosmos'
                    )}
                    initialOpen={true}
                >

                    <RangeControl
                        label={__(
                            'Margen superior',
                            'hoteles-cosmos'
                        )}
                        value={marginTop}
                        onChange={(value) =>
                            setAttributes({
                                marginTop: value
                            })
                        }
                        min={0}
                        max={150}
                    />


                    <RangeControl
                        label={__(
                            'Margen inferior',
                            'hoteles-cosmos'
                        )}
                        value={marginBottom}
                        onChange={(value) =>
                            setAttributes({
                                marginBottom: value
                            })
                        }
                        min={0}
                        max={150}
                    />


                    <RangeControl
                        label={__(
                            'Separación entre tarjetas',
                            'hoteles-cosmos'
                        )}
                        value={cardGap}
                        onChange={(value) =>
                            setAttributes({
                                cardGap: value
                            })
                        }
                        min={0}
                        max={80}
                    />


                    <SelectControl
                        label={__(
                            'Proporción de imagen',
                            'hoteles-cosmos'
                        )}
                        value={imageAspectRatio}
                        options={[
                            {
                                label: '4:3',
                                value: '4/3'
                            },
                            {
                                label: '3:2',
                                value: '3/2'
                            },
                            {
                                label: '16:9',
                                value: '16/9'
                            },
                            {
                                label: '9:10',
                                value: '9/10'
                            },
                            {
                                label: '1:1',
                                value: '1/1'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                imageAspectRatio: value
                            })
                        }
                    />


                    <RangeControl
                        label={__(
                            'Intensidad del overlay',
                            'hoteles-cosmos'
                        )}
                        value={overlay}
                        onChange={(value) =>
                            setAttributes({
                                overlay: value
                            })
                        }
                        min={0}
                        max={100}
                    />

                </PanelBody>


                {/* =================================================
                   CTA
                ================================================= */}

                <PanelBody
                    title={__(
                        'CTA',
                        'hoteles-cosmos'
                    )}
                    initialOpen={false}
                >

                    <TextControl
                        label={__(
                            'Texto del CTA',
                            'hoteles-cosmos'
                        )}
                        value={ctaText}
                        onChange={(value) =>
                            setAttributes({
                                ctaText: value
                            })
                        }
                    />


                    <RangeControl
                        label={__(
                            'Ancho del CTA (%)',
                            'hoteles-cosmos'
                        )}
                        value={ctaWidth}
                        onChange={(value) =>
                            setAttributes({
                                ctaWidth: value
                            })
                        }
                        min={50}
                        max={100}
                    />


                    <RangeControl
                        label={__(
                            'Grosor del borde',
                            'hoteles-cosmos'
                        )}
                        value={ctaBorderWidth}
                        onChange={(value) =>
                            setAttributes({
                                ctaBorderWidth: value
                            })
                        }
                        min={0}
                        max={5}
                    />


                    <RangeControl
                        label={__(
                            'Border radius',
                            'hoteles-cosmos'
                        )}
                        value={ctaBorderRadius}
                        onChange={(value) =>
                            setAttributes({
                                ctaBorderRadius: value
                            })
                        }
                        min={0}
                        max={50}
                    />


                    <div
                        className="cosmos-card-grid__color-control"
                    >

                        <p>
                            {__(
                                'Color del borde y texto',
                                'hoteles-cosmos'
                            )}
                        </p>

                        <ColorPicker
                            color={ctaColor}
                            onChange={(value) =>
                                setAttributes({
                                    ctaColor: value
                                })
                            }
                            disableAlpha
                        />

                    </div>


                    <div
                        className="cosmos-card-grid__color-control"
                    >

                        <p>
                            {__(
                                'Fondo del CTA',
                                'hoteles-cosmos'
                            )}
                        </p>

                        <ColorPicker
                            color={
                                ctaBackground === 'transparent'
                                    ? '#ffffff'
                                    : ctaBackground
                            }
                            onChange={(value) =>
                                setAttributes({
                                    ctaBackground: value
                                })
                            }
                            disableAlpha
                        />

                        <Button
                            variant="secondary"
                            onClick={() =>
                                setAttributes({
                                    ctaBackground:
                                        'transparent'
                                })
                            }
                        >
                            {__(
                                'Fondo transparente',
                                'hoteles-cosmos'
                            )}
                        </Button>

                    </div>

                </PanelBody>


                {/* =================================================
                   CARDS
                ================================================= */}

                {cards.map((card, index) => (

                    <PanelBody
                        key={index}
                        title={
                            `${__(
                                'Tarjeta',
                                'hoteles-cosmos'
                            )} ${index + 1}`
                        }
                        initialOpen={index === 0}
                    >

                        <MediaUploadCheck>

                            <MediaUpload
                                onSelect={(media) =>
                                    selectImage(
                                        index,
                                        media
                                    )
                                }
                                allowedTypes={[
                                    'image'
                                ]}
                                value={
                                    card.imageId || 0
                                }
                                render={({ open }) => (

                                    <div>

                                        {card.imageUrl ? (

                                            <>

                                                <img
                                                    src={
                                                        card.imageUrl
                                                    }
                                                    alt={
                                                        card.imageAlt
                                                    }
                                                    style={{
                                                        width:
                                                            '100%',
                                                        height:
                                                            'auto',
                                                        display:
                                                            'block',
                                                        marginBottom:
                                                            '12px'
                                                    }}
                                                />


                                                <Button
                                                    variant="secondary"
                                                    onClick={open}
                                                >
                                                    {__(
                                                        'Cambiar imagen',
                                                        'hoteles-cosmos'
                                                    )}
                                                </Button>


                                                <Button
                                                    variant="link"
                                                    isDestructive
                                                    onClick={() =>
                                                        removeImage(
                                                            index
                                                        )
                                                    }
                                                >
                                                    {__(
                                                        'Eliminar imagen',
                                                        'hoteles-cosmos'
                                                    )}
                                                </Button>

                                            </>

                                        ) : (

                                            <Button
                                                variant="primary"
                                                onClick={open}
                                            >
                                                {__(
                                                    'Seleccionar imagen',
                                                    'hoteles-cosmos'
                                                )}
                                            </Button>

                                        )}

                                    </div>

                                )}
                            />

                        </MediaUploadCheck>


                        {card.imageUrl && (

                            <TextControl
                                label={__(
                                    'Texto alternativo',
                                    'hoteles-cosmos'
                                )}
                                value={
                                    card.imageAlt || ''
                                }
                                onChange={(value) =>
                                    updateCard(
                                        index,
                                        {
                                            imageAlt:
                                                value
                                        }
                                    )
                                }
                            />

                        )}


                        <RangeControl
                            label={__(
                                'Tamaño del texto',
                                'hoteles-cosmos'
                            )}
                            value={
                                card.textSize || 20
                            }
                            onChange={(value) =>
                                updateCard(
                                    index,
                                    {
                                        textSize:
                                            value
                                    }
                                )
                            }
                            min={10}
                            max={60}
                        />


                        <SelectControl
                            label={__(
                                'Alineación del texto',
                                'hoteles-cosmos'
                            )}
                            value={
                                card.textAlign ||
                                'left'
                            }
                            options={[
                                {
                                    label: __(
                                        'Izquierda',
                                        'hoteles-cosmos'
                                    ),
                                    value: 'left'
                                },
                                {
                                    label: __(
                                        'Centro',
                                        'hoteles-cosmos'
                                    ),
                                    value: 'center'
                                },
                                {
                                    label: __(
                                        'Derecha',
                                        'hoteles-cosmos'
                                    ),
                                    value: 'right'
                                }
                            ]}
                            onChange={(value) =>
                                updateCard(
                                    index,
                                    {
                                        textAlign:
                                            value
                                    }
                                )
                            }
                        />


                        <div
                            className="cosmos-card-grid__color-control"
                        >

                            <p>
                                {__(
                                    'Color del texto',
                                    'hoteles-cosmos'
                                )}
                            </p>

                            <ColorPicker
                                color={
                                    card.textColor ||
                                    '#ffffff'
                                }
                                onChange={(value) =>
                                    updateCard(
                                        index,
                                        {
                                            textColor:
                                                value
                                        }
                                    )
                                }
                                disableAlpha
                            />

                        </div>


                        <ToggleControl
                            label={__(
                                'Negrita',
                                'hoteles-cosmos'
                            )}
                            checked={
                                !!card.textBold
                            }
                            onChange={(value) =>
                                updateCard(
                                    index,
                                    {
                                        textBold:
                                            value
                                    }
                                )
                            }
                        />


                        <TextControl
                            label={__(
                                'URL de la tarjeta',
                                'hoteles-cosmos'
                            )}
                            value={
                                card.ctaUrl || ''
                            }
                            onChange={(value) =>
                                updateCard(
                                    index,
                                    {
                                        ctaUrl:
                                            value
                                    }
                                )
                            }
                        />


                        <Button
                            variant="link"
                            isDestructive
                            onClick={() =>
                                removeCard(index)
                            }
                        >
                            {__(
                                'Eliminar tarjeta',
                                'hoteles-cosmos'
                            )}
                        </Button>

                    </PanelBody>

                ))}

            </InspectorControls>


            {/* =================================================
               BLOQUE
            ================================================= */}

            <section {...blockProps}>

                {/* IMPORTANTE:
                    Se conserva el container general
                    del sitio. No se redefine su ancho.
                */}

                <div className="container">

                    <div className="cosmos-card-grid__list">

                        {cards.map((card, index) => (

                            <div
                                className="cosmos-card-grid__card"
                                key={index}
                            >

                                {/* =================================================
                                   IMAGEN
                                ================================================= */}

                                <div
                                    className="cosmos-card-grid__image-wrapper"
                                >

                                    {card.imageUrl ? (

                                        <img
                                            src={
                                                card.imageUrl
                                            }
                                            alt=""
                                        />

                                    ) : (

                                        <MediaUploadCheck>

                                            <MediaUpload
                                                onSelect={(media) =>
                                                    selectImage(
                                                        index,
                                                        media
                                                    )
                                                }
                                                allowedTypes={[
                                                    'image'
                                                ]}
                                                value={
                                                    card.imageId ||
                                                    0
                                                }
                                                render={({ open }) => (

                                                    <div
                                                        className="cosmos-card-grid__placeholder"
                                                        onClick={
                                                            open
                                                        }
                                                    >

                                                        <span>
                                                            {__(
                                                                'Seleccionar imagen',
                                                                'hoteles-cosmos'
                                                            )}
                                                        </span>

                                                    </div>

                                                )}
                                            />

                                        </MediaUploadCheck>

                                    )}


                                    {card.imageUrl && (

                                        <>

                                            <div
                                                className="cosmos-card-grid__overlay"
                                                style={{
                                                    opacity:
                                                        overlay /
                                                        100
                                                }}
                                            />


                                            <RichText
                                                tagName="div"
                                                className={
                                                    'cosmos-card-grid__text' +
                                                    (
                                                        card.textBold
                                                            ? ' is-bold'
                                                            : ''
                                                    )
                                                }
                                                value={
                                                    card.text || ''
                                                }
                                                onChange={(value) =>
                                                    updateCard(
                                                        index,
                                                        {
                                                            text:
                                                                value
                                                        }
                                                    )
                                                }
                                                placeholder={__(
                                                    'Escribe el texto...',
                                                    'hoteles-cosmos'
                                                )}
                                                allowedFormats={[
                                                    'core/bold',
                                                    'core/italic',
                                                    'core/link'
                                                ]}
                                                style={{
                                                    color:
                                                        card.textColor ||
                                                        '#ffffff',
                                                    fontSize:
                                                        `${card.textSize || 20}px`,
                                                    textAlign:
                                                        card.textAlign ||
                                                        'left'
                                                }}
                                            />

                                        </>

                                    )}

                                </div>


                                {/* =================================================
                                   CTA
                                ================================================= */}

                                <a
                                    className="cosmos-card-grid__cta"
                                    href={
                                        card.ctaUrl ||
                                        '#'
                                    }
                                    style={{
                                        width:
                                            `${ctaWidth}%`,
                                        color:
                                            ctaColor,
                                        borderColor:
                                            ctaColor,
                                        borderWidth:
                                            `${ctaBorderWidth}px`,
                                        borderRadius:
                                            `${ctaBorderRadius}px`,
                                        backgroundColor:
                                            ctaBackground
                                    }}
                                    onClick={(event) =>
                                        event.stopPropagation()
                                    }
                                >

                                    {ctaText}

                                </a>

                            </div>

                        ))}


                        {/* =================================================
                           AGREGAR
                        ================================================= */}

                        <div
                            className="cosmos-card-grid__add"
                        >

                            <Button
                                variant="primary"
                                onClick={addCard}
                            >
                                {__(
                                    'Agregar tarjeta',
                                    'hoteles-cosmos'
                                )}
                            </Button>

                        </div>

                    </div>

                </div>

            </section>

        </Fragment>

    );

}


registerBlockType(
    'hoteles-cosmos/card-grid',
    {
        edit: Edit
    }
);