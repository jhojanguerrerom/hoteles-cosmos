import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls
} from '@wordpress/block-editor';

import {
    PanelBody,
    Button,
    RangeControl,
    ColorPalette,
    SelectControl,
    TextControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';


function Edit({ attributes, setAttributes }) {

    const {
        items,
        circleSize,
        iconSize,
        textSize,
        textColor,
        textWeight,
        textAlign,
        spacing
    } = attributes;


    /*
     * =====================================================
     * ACTUALIZAR ELEMENTO
     * =====================================================
     */

    const updateItem = (index, changes) => {

        const newItems = [...items];

        newItems[index] = {
            ...newItems[index],
            ...changes
        };

        setAttributes({
            items: newItems
        });
    };


    /*
     * =====================================================
     * AGREGAR ELEMENTO
     * =====================================================
     */

    const addItem = () => {

        if (items.length >= 6) {
            return;
        }

        setAttributes({
            items: [
                ...items,
                {
                    iconId: 0,
                    iconUrl: '',
                    iconAlt: '',
                    text: 'Nuevo texto'
                }
            ]
        });
    };


    /*
     * =====================================================
     * ELIMINAR ELEMENTO
     * =====================================================
     */

    const removeItem = (index) => {

        if (items.length <= 1) {
            return;
        }

        const newItems = items.filter(
            (_, itemIndex) => itemIndex !== index
        );

        setAttributes({
            items: newItems
        });
    };


    /*
     * =====================================================
     * SELECCIONAR ICONO
     * =====================================================
     */

    const selectIcon = (index, media) => {

        if (!media || !media.url) {
            return;
        }

        updateItem(index, {
            iconId: media.id,
            iconUrl: media.url,
            iconAlt: media.alt || media.title || ''
        });
    };


    /*
     * =====================================================
     * PROPIEDADES DEL BLOQUE
     * =====================================================
     */

    const blockProps = useBlockProps({
        className: 'cosmos-icon-text'
    });


    return (

        <Fragment>

            {/* =================================================
                CONTROLES DEL BLOQUE
            ================================================= */}

            <InspectorControls>

                <PanelBody
                    title={__('Elementos', 'hoteles-cosmos')}
                    initialOpen={true}
                >

                    <p>
                        {__(
                            `Elementos: ${items.length} de 6`,
                            'hoteles-cosmos'
                        )}
                    </p>

                    <Button
                        variant="primary"
                        onClick={addItem}
                        disabled={items.length >= 6}
                    >
                        {__('Agregar icono', 'hoteles-cosmos')}
                    </Button>

                </PanelBody>


                {/* =================================================
                    ESTILO DEL CÍRCULO
                ================================================= */}

                <PanelBody
                    title={__('Iconos', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <RangeControl
                        label={__('Tamaño del círculo', 'hoteles-cosmos')}
                        value={circleSize}
                        onChange={(value) =>
                            setAttributes({
                                circleSize: value
                            })
                        }
                        min={40}
                        max={160}
                        step={1}
                    />

                    <RangeControl
                        label={__('Tamaño del icono', 'hoteles-cosmos')}
                        value={iconSize}
                        onChange={(value) =>
                            setAttributes({
                                iconSize: value
                            })
                        }
                        min={16}
                        max={100}
                        step={1}
                    />

                    <RangeControl
                        label={__('Espacio entre iconos', 'hoteles-cosmos')}
                        value={spacing}
                        onChange={(value) =>
                            setAttributes({
                                spacing: value
                            })
                        }
                        min={0}
                        max={100}
                        step={1}
                    />

                </PanelBody>


                {/* =================================================
                    TEXTO
                ================================================= */}

                <PanelBody
                    title={__('Texto', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <RangeControl
                        label={__('Tamaño del texto', 'hoteles-cosmos')}
                        value={textSize}
                        onChange={(value) =>
                            setAttributes({
                                textSize: value
                            })
                        }
                        min={10}
                        max={40}
                        step={1}
                    />


                    <SelectControl
                        label={__('Peso del texto', 'hoteles-cosmos')}
                        value={textWeight}
                        options={[
                            {
                                label: __('Normal', 'hoteles-cosmos'),
                                value: '400'
                            },
                            {
                                label: __('Medio', 'hoteles-cosmos'),
                                value: '500'
                            },
                            {
                                label: __('Seminegrita', 'hoteles-cosmos'),
                                value: '600'
                            },
                            {
                                label: __('Negrita', 'hoteles-cosmos'),
                                value: '700'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                textWeight: value
                            })
                        }
                    />


                    <SelectControl
                        label={__('Alineación del texto', 'hoteles-cosmos')}
                        value={textAlign}
                        options={[
                            {
                                label: __('Izquierda', 'hoteles-cosmos'),
                                value: 'left'
                            },
                            {
                                label: __('Centro', 'hoteles-cosmos'),
                                value: 'center'
                            },
                            {
                                label: __('Derecha', 'hoteles-cosmos'),
                                value: 'right'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                textAlign: value
                            })
                        }
                    />


                    <p>
                        <strong>
                            {__('Color del texto', 'hoteles-cosmos')}
                        </strong>
                    </p>

                    <ColorPalette
                        value={textColor}
                        onChange={(value) =>
                            setAttributes({
                                textColor: value || '#111111'
                            })
                        }
                    />

                </PanelBody>

            </InspectorControls>


            {/* =================================================
                PREVISUALIZACIÓN
            ================================================= */}

            <div {...blockProps}>

                <div
                    className="cosmos-icon-text__grid"
                    style={{
                        '--cosmos-icon-circle-size': `${circleSize}px`,
                        '--cosmos-icon-size': `${iconSize}px`,
                        '--cosmos-icon-text-size': `${textSize}px`,
                        '--cosmos-icon-text-color': textColor,
                        '--cosmos-icon-text-weight': textWeight,
                        '--cosmos-icon-text-align': textAlign,
                        '--cosmos-icon-spacing': `${spacing}px`
                    }}
                >

                    {items.map((item, index) => (

                        <div
                            className="cosmos-icon-text__item"
                            key={index}
                        >

                            {/* =================================================
                                ICONO
                            ================================================= */}

                            <MediaUploadCheck>

                                <MediaUpload
                                    onSelect={(media) =>
                                        selectIcon(index, media)
                                    }
                                    allowedTypes={['image']}
                                    value={item.iconId}
                                    render={({ open }) => (

                                        <div>

                                            {item.iconUrl ? (

                                                <div>

                                                    <button
                                                        type="button"
                                                        className="cosmos-icon-text__circle"
                                                        onClick={open}
                                                        aria-label={__(
                                                            'Cambiar icono',
                                                            'hoteles-cosmos'
                                                        )}
                                                    >

                                                        <img
                                                            src={item.iconUrl}
                                                            alt={item.iconAlt}
                                                        />

                                                    </button>

                                                    <div className="cosmos-icon-text__image-actions">

                                                        <Button
                                                            variant="link"
                                                            onClick={open}
                                                        >
                                                            {__(
                                                                'Cambiar icono',
                                                                'hoteles-cosmos'
                                                            )}
                                                        </Button>

                                                    </div>

                                                </div>

                                            ) : (

                                                <button
                                                    type="button"
                                                    className="cosmos-icon-text__circle cosmos-icon-text__circle--empty"
                                                    onClick={open}
                                                >
                                                    <span>
                                                        +
                                                    </span>
                                                </button>

                                            )}

                                        </div>

                                    )}
                                />

                            </MediaUploadCheck>


                            {/* =================================================
                                TEXTO
                            ================================================= */}

                            <TextControl
                                value={item.text}
                                onChange={(value) =>
                                    updateItem(index, {
                                        text: value
                                    })
                                }
                                placeholder={__(
                                    'Texto',
                                    'hoteles-cosmos'
                                )}
                            />


                            {/* =================================================
                                ELIMINAR
                            ================================================= */}

                            {items.length > 1 && (

                                <Button
                                    variant="link"
                                    isDestructive
                                    onClick={() =>
                                        removeItem(index)
                                    }
                                >
                                    {__('Eliminar', 'hoteles-cosmos')}
                                </Button>

                            )}

                        </div>

                    ))}

                </div>

            </div>

        </Fragment>
    );
}


/*
 * =====================================================
 * REGISTRO DEL BLOQUE
 * =====================================================
 */

registerBlockType(
    'hoteles-cosmos/icon-text',
    {
        edit: Edit
    }
);