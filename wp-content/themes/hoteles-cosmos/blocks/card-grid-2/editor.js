import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import {
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    useBlockProps
} from '@wordpress/block-editor';

import {
    PanelBody,
    Button,
    RangeControl,
    SelectControl,
    ToggleControl,
    TextControl,
    ColorPicker
} from '@wordpress/components';

import metadata from './block.json';

import './editor.css';


registerBlockType(metadata.name, {

    ...metadata,

    edit: ({ attributes, setAttributes }) => {

        const {
            marginTop = 40,
            marginBottom = 40,

            titleColor = '#222222',
            titleSize = 24,
            titleWeight = '700',
            titleAlign = 'left',
            titleMarginBottom = 18,

            contentBackground = '#f5f1ea',
            itemColor = '#333333',
            itemSize = 15,
            itemWeight = '400',
            itemSpacing = 12,

            cards = []
        } = attributes;


        /*
         * =========================================
         * DEFAULT CARD
         * =========================================
         */

        const createCard = () => ({
            imageId: 0,
            imageUrl: '',
            imageAlt: '',
            imagePosition: 'center center',

            title: 'Título de la card',

            description: 'Escribe aquí la descripción de esta card.',

            menuEnabled: true,
            menuText: 'Menú',
            menuUrl: '#',

            locationEnabled: true,
            location: 'Dirección del lugar',

            scheduleEnabled: true,
            schedule: 'Horario de atención',

            socialInstagram: '',
            socialFacebook: ''
        });


        /*
         * =========================================
         * BLOCK PROPS
         * =========================================
         */

        const blockProps = useBlockProps({
            className: 'cosmos-card-grid-2',

            style: {
                '--cosmos-card-grid-2-margin-top': `${marginTop}px`,
                '--cosmos-card-grid-2-margin-bottom': `${marginBottom}px`,

                '--cosmos-card-title-color': titleColor,
                '--cosmos-card-title-size': `${titleSize}px`,
                '--cosmos-card-title-weight': titleWeight,
                '--cosmos-card-title-align': titleAlign,
                '--cosmos-card-title-margin-bottom': `${titleMarginBottom}px`,

                '--cosmos-card-content-background': contentBackground,
                '--cosmos-card-item-color': itemColor,
                '--cosmos-card-item-size': `${itemSize}px`,
                '--cosmos-card-item-weight': itemWeight,
                '--cosmos-card-item-spacing': `${itemSpacing}px`
            }
        });


        /*
         * =========================================
         * UPDATE CARD
         * =========================================
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
         * =========================================
         * ADD CARD
         * =========================================
         */

        const addCard = () => {

            setAttributes({
                cards: [
                    ...cards,
                    createCard()
                ]
            });
        };


        /*
         * =========================================
         * REMOVE CARD
         * =========================================
         */

        const removeCard = (index) => {

            const newCards = cards.filter(
                (_, cardIndex) => cardIndex !== index
            );

            setAttributes({
                cards: newCards
            });
        };


        /*
         * =========================================
         * MOVE CARD
         * =========================================
         */

        const moveCard = (index, direction) => {

            const newCards = [...cards];

            const targetIndex =
                direction === 'up'
                    ? index - 1
                    : index + 1;

            if (
                targetIndex < 0 ||
                targetIndex >= newCards.length
            ) {
                return;
            }

            [
                newCards[index],
                newCards[targetIndex]
            ] = [
                newCards[targetIndex],
                newCards[index]
            ];

            setAttributes({
                cards: newCards
            });
        };


        /*
         * =========================================
         * SELECT IMAGE
         * =========================================
         */

        const selectImage = (index, media) => {

            updateCard(index, {
                imageId: media.id,
                imageUrl: media.url,
                imageAlt: media.alt || ''
            });
        };


        /*
         * =========================================
         * REMOVE IMAGE
         * =========================================
         */

        const removeImage = (index) => {

            updateCard(index, {
                imageId: 0,
                imageUrl: '',
                imageAlt: ''
            });
        };


        return (
            <div {...blockProps}>

                <InspectorControls>

                    {/* =========================================
                        CONFIGURACIÓN GENERAL
                    ========================================== */}

                    <PanelBody
                        title={__('Configuración general', 'hoteles-cosmos')}
                        initialOpen={true}
                    >

                        <RangeControl
                            label={__('Margen superior del bloque', 'hoteles-cosmos')}
                            value={marginTop}
                            onChange={(value) =>
                                setAttributes({
                                    marginTop: value
                                })
                            }
                            min={0}
                            max={200}
                        />

                        <RangeControl
                            label={__('Margen inferior del bloque', 'hoteles-cosmos')}
                            value={marginBottom}
                            onChange={(value) =>
                                setAttributes({
                                    marginBottom: value
                                })
                            }
                            min={0}
                            max={200}
                        />

                    </PanelBody>


                    {/* =========================================
                        ESTILO GENERAL DEL TÍTULO
                    ========================================== */}

                    <PanelBody
                        title={__('Estilo general del título', 'hoteles-cosmos')}
                        initialOpen={false}
                    >

                        <RangeControl
                            label={__('Tamaño', 'hoteles-cosmos')}
                            value={titleSize}
                            onChange={(value) =>
                                setAttributes({
                                    titleSize: value
                                })
                            }
                            min={12}
                            max={60}
                        />


                        <SelectControl
                            label={__('Peso', 'hoteles-cosmos')}
                            value={titleWeight}
                            options={[
                                {
                                    label: 'Normal',
                                    value: '400'
                                },
                                {
                                    label: 'Medio',
                                    value: '500'
                                },
                                {
                                    label: 'Seminegrita',
                                    value: '600'
                                },
                                {
                                    label: 'Negrita',
                                    value: '700'
                                },
                                {
                                    label: 'Extra negrita',
                                    value: '800'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    titleWeight: value
                                })
                            }
                        />


                        <SelectControl
                            label={__('Alineación', 'hoteles-cosmos')}
                            value={titleAlign}
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
                                    titleAlign: value
                                })
                            }
                        />


                        <RangeControl
                            label={__('Espacio inferior', 'hoteles-cosmos')}
                            value={titleMarginBottom}
                            onChange={(value) =>
                                setAttributes({
                                    titleMarginBottom: value
                                })
                            }
                            min={0}
                            max={60}
                        />


                        <p>
                            <strong>
                                {__('Color', 'hoteles-cosmos')}
                            </strong>
                        </p>

                        <ColorPicker
                            color={titleColor}
                            onChangeComplete={(color) =>
                                setAttributes({
                                    titleColor: color.hex
                                })
                            }
                            disableAlpha
                        />

                    </PanelBody>


                    {/* =========================================
                        ESTILO GENERAL DEL CONTENIDO
                    ========================================== */}

                    <PanelBody
                        title={__('Estilo general del contenido', 'hoteles-cosmos')}
                        initialOpen={false}
                    >

                        <p>
                            <strong>
                                {__('Color de fondo', 'hoteles-cosmos')}
                            </strong>
                        </p>

                        <ColorPicker
                            color={contentBackground}
                            onChangeComplete={(color) =>
                                setAttributes({
                                    contentBackground: color.hex
                                })
                            }
                            disableAlpha
                        />


                        <p>
                            <strong>
                                {__('Color del texto', 'hoteles-cosmos')}
                            </strong>
                        </p>

                        <ColorPicker
                            color={itemColor}
                            onChangeComplete={(color) =>
                                setAttributes({
                                    itemColor: color.hex
                                })
                            }
                            disableAlpha
                        />


                        <RangeControl
                            label={__('Tamaño del texto', 'hoteles-cosmos')}
                            value={itemSize}
                            onChange={(value) =>
                                setAttributes({
                                    itemSize: value
                                })
                            }
                            min={10}
                            max={30}
                        />


                        <SelectControl
                            label={__('Peso del texto', 'hoteles-cosmos')}
                            value={itemWeight}
                            options={[
                                {
                                    label: 'Normal',
                                    value: '400'
                                },
                                {
                                    label: 'Medio',
                                    value: '500'
                                },
                                {
                                    label: 'Seminegrita',
                                    value: '600'
                                },
                                {
                                    label: 'Negrita',
                                    value: '700'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    itemWeight: value
                                })
                            }
                        />


                        <RangeControl
                            label={__('Separación entre elementos', 'hoteles-cosmos')}
                            value={itemSpacing}
                            onChange={(value) =>
                                setAttributes({
                                    itemSpacing: value
                                })
                            }
                            min={0}
                            max={40}
                        />

                    </PanelBody>


                    {/* =========================================
                        CARDS
                    ========================================== */}

                    <PanelBody
                        title={__('Cards', 'hoteles-cosmos')}
                        initialOpen={true}
                    >

                        <p>
                            <strong>
                                {__('Cantidad de cards:', 'hoteles-cosmos')}
                            </strong>{' '}
                            {cards.length}
                        </p>


                        <Button
                            variant="primary"
                            onClick={addCard}
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                marginBottom: '20px'
                            }}
                        >
                            {__('+ Agregar card', 'hoteles-cosmos')}
                        </Button>


                        {cards.map((card, index) => (

                            <PanelBody
                                key={index}
                                title={`${__('Card', 'hoteles-cosmos')} ${index + 1}`}
                                initialOpen={false}
                            >

                                {/* ORDEN */}

                                <div className="cosmos-card-grid-2__card-actions">

                                    <Button
                                        variant="secondary"
                                        disabled={index === 0}
                                        onClick={() =>
                                            moveCard(index, 'up')
                                        }
                                    >
                                        ↑
                                    </Button>


                                    <Button
                                        variant="secondary"
                                        disabled={
                                            index === cards.length - 1
                                        }
                                        onClick={() =>
                                            moveCard(index, 'down')
                                        }
                                    >
                                        ↓
                                    </Button>


                                    <Button
                                        variant="secondary"
                                        isDestructive
                                        onClick={() =>
                                            removeCard(index)
                                        }
                                    >
                                        {__('Eliminar', 'hoteles-cosmos')}
                                    </Button>

                                </div>


                                {/* IMAGEN */}

                                <PanelBody
                                    title={__('Imagen', 'hoteles-cosmos')}
                                    initialOpen={false}
                                >

                                    <MediaUploadCheck>

                                        <MediaUpload
                                            onSelect={(media) =>
                                                selectImage(index, media)
                                            }
                                            allowedTypes={['image']}
                                            value={card.imageId}
                                            render={({ open }) => (

                                                <Button
                                                    onClick={open}
                                                    variant="primary"
                                                    style={{
                                                        width: '100%',
                                                        marginBottom: '10px'
                                                    }}
                                                >
                                                    {card.imageUrl
                                                        ? __('Cambiar imagen', 'hoteles-cosmos')
                                                        : __('Seleccionar imagen', 'hoteles-cosmos')
                                                    }
                                                </Button>

                                            )}
                                        />

                                    </MediaUploadCheck>


                                    {card.imageUrl && (

                                        <Button
                                            onClick={() =>
                                                removeImage(index)
                                            }
                                            variant="secondary"
                                            isDestructive
                                            style={{
                                                width: '100%',
                                                marginBottom: '15px'
                                            }}
                                        >
                                            {__('Eliminar imagen', 'hoteles-cosmos')}
                                        </Button>

                                    )}


                                    <SelectControl
                                        label={__('Posición de la imagen', 'hoteles-cosmos')}
                                        value={card.imagePosition}
                                        options={[
                                            {
                                                label: 'Centro',
                                                value: 'center center'
                                            },
                                            {
                                                label: 'Arriba',
                                                value: 'center top'
                                            },
                                            {
                                                label: 'Abajo',
                                                value: 'center bottom'
                                            },
                                            {
                                                label: 'Izquierda',
                                                value: 'left center'
                                            },
                                            {
                                                label: 'Derecha',
                                                value: 'right center'
                                            }
                                        ]}
                                        onChange={(value) =>
                                            updateCard(index, {
                                                imagePosition: value
                                            })
                                        }
                                    />

                                </PanelBody>


                                {/* MENÚ */}

                                <PanelBody
                                    title={__('Menú', 'hoteles-cosmos')}
                                    initialOpen={false}
                                >

                                    <ToggleControl
                                        label={__('Mostrar menú', 'hoteles-cosmos')}
                                        checked={card.menuEnabled}
                                        onChange={(value) =>
                                            updateCard(index, {
                                                menuEnabled: value
                                            })
                                        }
                                    />

                                    {card.menuEnabled && (

                                        <>

                                            <TextControl
                                                label={__('Texto', 'hoteles-cosmos')}
                                                value={card.menuText}
                                                onChange={(value) =>
                                                    updateCard(index, {
                                                        menuText: value
                                                    })
                                                }
                                            />

                                            <TextControl
                                                label={__('URL', 'hoteles-cosmos')}
                                                value={card.menuUrl}
                                                onChange={(value) =>
                                                    updateCard(index, {
                                                        menuUrl: value
                                                    })
                                                }
                                            />

                                        </>

                                    )}

                                </PanelBody>


                                {/* UBICACIÓN */}

                                <PanelBody
                                    title={__('Ubicación', 'hoteles-cosmos')}
                                    initialOpen={false}
                                >

                                    <ToggleControl
                                        label={__('Mostrar ubicación', 'hoteles-cosmos')}
                                        checked={card.locationEnabled}
                                        onChange={(value) =>
                                            updateCard(index, {
                                                locationEnabled: value
                                            })
                                        }
                                    />

                                    {card.locationEnabled && (

                                        <TextControl
                                            label={__('Dirección', 'hoteles-cosmos')}
                                            value={card.location}
                                            onChange={(value) =>
                                                updateCard(index, {
                                                    location: value
                                                })
                                            }
                                        />

                                    )}

                                </PanelBody>


                                {/* HORARIO */}

                                <PanelBody
                                    title={__('Horario', 'hoteles-cosmos')}
                                    initialOpen={false}
                                >

                                    <ToggleControl
                                        label={__('Mostrar horario', 'hoteles-cosmos')}
                                        checked={card.scheduleEnabled}
                                        onChange={(value) =>
                                            updateCard(index, {
                                                scheduleEnabled: value
                                            })
                                        }
                                    />

                                    {card.scheduleEnabled && (

                                        <TextControl
                                            label={__('Horario', 'hoteles-cosmos')}
                                            value={card.schedule}
                                            onChange={(value) =>
                                                updateCard(index, {
                                                    schedule: value
                                                })
                                            }
                                        />

                                    )}

                                </PanelBody>


                                {/* REDES SOCIALES */}

                                <PanelBody
                                    title={__('Redes sociales', 'hoteles-cosmos')}
                                    initialOpen={false}
                                >

                                    <TextControl
                                        label={__('URL de Instagram', 'hoteles-cosmos')}
                                        value={card.socialInstagram}
                                        placeholder="https://instagram.com/..."
                                        onChange={(value) =>
                                            updateCard(index, {
                                                socialInstagram: value
                                            })
                                        }
                                    />


                                    <TextControl
                                        label={__('URL de Facebook', 'hoteles-cosmos')}
                                        value={card.socialFacebook}
                                        placeholder="https://facebook.com/..."
                                        onChange={(value) =>
                                            updateCard(index, {
                                                socialFacebook: value
                                            })
                                        }
                                    />


                                    <p>
                                        {__(
                                            'Si dejas una URL vacía, ese icono no se mostrará.',
                                            'hoteles-cosmos'
                                        )}
                                    </p>

                                </PanelBody>

                            </PanelBody>

                        ))}

                    </PanelBody>

                </InspectorControls>


                {/* =========================================
                    CONTENIDO DEL BLOQUE
                ========================================== */}

                <div className="container">

                    <div className="cosmos-card-grid-2__cards">

                        {cards.map((card, index) => (

                            <article
                                className="cosmos-card-grid-2__card"
                                key={index}
                            >

                                {/* IMAGEN */}

                                {card.imageUrl ? (

                                    <div
                                        className="cosmos-card-grid-2__image"
                                        style={{
                                            backgroundImage: `url("${card.imageUrl}")`,
                                            backgroundPosition: card.imagePosition
                                        }}
                                    />

                                ) : (

                                    <div className="cosmos-card-grid-2__image-placeholder">

                                        <MediaUploadCheck>

                                            <MediaUpload
                                                onSelect={(media) =>
                                                    selectImage(index, media)
                                                }
                                                allowedTypes={['image']}
                                                value={card.imageId}
                                                render={({ open }) => (

                                                    <Button
                                                        onClick={open}
                                                        variant="primary"
                                                    >
                                                        {__(
                                                            'Seleccionar imagen',
                                                            'hoteles-cosmos'
                                                        )}
                                                    </Button>

                                                )}
                                            />

                                        </MediaUploadCheck>

                                    </div>

                                )}


                                {/* TÍTULO */}

                                <RichText
                                    tagName="h3"
                                    className="cosmos-card-grid-2__title"
                                    value={card.title}
                                    onChange={(value) =>
                                        updateCard(index, {
                                            title: value
                                        })
                                    }
                                    placeholder={__(
                                        'Título de la card...',
                                        'hoteles-cosmos'
                                    )}
                                />


                                {/* CONTENIDO */}

                                <div className="cosmos-card-grid-2__content">

                                    <RichText
                                        tagName="p"
                                        className="cosmos-card-grid-2__description"
                                        value={card.description}
                                        onChange={(value) =>
                                            updateCard(index, {
                                                description: value
                                            })
                                        }
                                        placeholder={__(
                                            'Escribe la descripción...',
                                            'hoteles-cosmos'
                                        )}
                                    />


                                    <div className="cosmos-card-grid-2__items">

                                        {card.menuEnabled && (

                                            <a
                                                href={card.menuUrl || '#'}
                                                className="cosmos-card-grid-2__item cosmos-card-grid-2__menu"
                                                onClick={(event) =>
                                                    event.preventDefault()
                                                }
                                            >
                                                <span>
                                                    {card.menuText}
                                                </span>
                                            </a>

                                        )}


                                        {card.locationEnabled && (

                                            <div className="cosmos-card-grid-2__item">

                                                <span className="cosmos-card-grid-2__item-icon">
                                                    ⌖
                                                </span>

                                                <span>
                                                    {card.location}
                                                </span>

                                            </div>

                                        )}


                                        {card.scheduleEnabled && (

                                            <div className="cosmos-card-grid-2__item">

                                                <span className="cosmos-card-grid-2__item-icon">
                                                    ◷
                                                </span>

                                                <span>
                                                    {card.schedule}
                                                </span>

                                            </div>

                                        )}

                                    </div>


                                    {/* REDES */}

                                    {(card.socialInstagram || card.socialFacebook) && (

                                        <div className="cosmos-card-grid-2__social">

                                            {card.socialInstagram && (

                                                <a
                                                    href={card.socialInstagram}
                                                    className="cosmos-card-grid-2__social-link"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(event) =>
                                                        event.preventDefault()
                                                    }
                                                >

                                                    <img
                                                        src="/wp-content/themes/hoteles-cosmos/assets/icons/black-instagram.svg"
                                                        alt="Instagram"
                                                    />

                                                </a>

                                            )}


                                            {card.socialFacebook && (

                                                <a
                                                    href={card.socialFacebook}
                                                    className="cosmos-card-grid-2__social-link"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(event) =>
                                                        event.preventDefault()
                                                    }
                                                >

                                                    <img
                                                        src="/wp-content/themes/hoteles-cosmos/assets/icons/black-facebook.svg"
                                                        alt="Facebook"
                                                    />

                                                </a>

                                            )}

                                        </div>

                                    )}

                                </div>

                            </article>

                        ))}


                        {cards.length === 0 && (

                            <div className="cosmos-card-grid-2__empty">

                                <p>
                                    {__(
                                        'Aún no hay cards.',
                                        'hoteles-cosmos'
                                    )}
                                </p>

                                <Button
                                    variant="primary"
                                    onClick={addCard}
                                >
                                    {__(
                                        '+ Agregar primera card',
                                        'hoteles-cosmos'
                                    )}
                                </Button>

                            </div>

                        )}

                    </div>

                </div>

            </div>
        );
    },

    save: () => null
});