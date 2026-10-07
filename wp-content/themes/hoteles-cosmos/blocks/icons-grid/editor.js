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
    RangeControl,
    SelectControl,
    Button,
    ColorPalette
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';


function Edit({ attributes, setAttributes }) {

    const {
        items,
        iconSize,
        iconBackgroundColor,
        iconBorderRadius,
        iconGap,
        textColor,
        textFontSize,
        textAlign,
        textMarginTop,
        paddingTop,
        paddingBottom
    } = attributes;


    /*
     * AGREGAR ICONO
     */

    const addItem = () => {

        if (items.length >= 6) {
            return;
        }

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
     * ELIMINAR ICONO
     */

    const removeItem = (index) => {

        const newItems = [...items];

        newItems.splice(index, 1);

        setAttributes({
            items: newItems
        });
    };


    /*
     * SELECCIONAR ICONO
     */

    const onSelectIcon = (media, index) => {

        if (!media || !media.url) {
            return;
        }

        const newItems = [...items];

        newItems[index] = {
            ...newItems[index],
            id: media.id,
            url: media.url,
            alt: media.alt || media.title || ''
        };

        setAttributes({
            items: newItems
        });
    };


    /*
     * CAMBIAR TEXTO
     */

    const onChangeText = (value, index) => {

        const newItems = [...items];

        newItems[index] = {
            ...newItems[index],
            text: value
        };

        setAttributes({
            items: newItems
        });
    };


    /*
     * PROPIEDADES DEL BLOQUE
     */

    const blockProps = useBlockProps({
        className: 'cosmos-icons-grid'
    });


    return (

        <Fragment>

            <InspectorControls>

                {/* =====================================================
                    ICONOS
                ====================================================== */}

                <PanelBody
                    title={__(
                        `Iconos (${items.length}/6)`,
                        'hoteles-cosmos'
                    )}
                    initialOpen={true}
                >

                    <p>
                        {__(
                            'Puedes agregar hasta 6 iconos.',
                            'hoteles-cosmos'
                        )}
                    </p>


                    {items.map((item, index) => (

                        <div
                            className="cosmos-icons-grid__control"
                            key={index}
                        >

                            <div className="cosmos-icons-grid__control-header">

                                <strong>
                                    {__('Icono', 'hoteles-cosmos')} {index + 1}
                                </strong>

                                <Button
                                    variant="link"
                                    isDestructive
                                    onClick={() =>
                                        removeItem(index)
                                    }
                                >
                                    {__('Eliminar', 'hoteles-cosmos')}
                                </Button>

                            </div>


                            <MediaUploadCheck>

                                <MediaUpload
                                    onSelect={(media) =>
                                        onSelectIcon(
                                            media,
                                            index
                                        )
                                    }
                                    allowedTypes={['image']}
                                    value={item.id}
                                    render={({ open }) => (

                                        <div>

                                            {item.url ? (

                                                <>

                                                    <img
                                                        src={item.url}
                                                        alt={item.alt}
                                                        className="cosmos-icons-grid__control-preview"
                                                    />

                                                    <Button
                                                        variant="secondary"
                                                        onClick={open}
                                                    >
                                                        {__(
                                                            'Cambiar icono',
                                                            'hoteles-cosmos'
                                                        )}
                                                    </Button>

                                                </>

                                            ) : (

                                                <Button
                                                    variant="secondary"
                                                    onClick={open}
                                                >
                                                    {__(
                                                        'Seleccionar icono',
                                                        'hoteles-cosmos'
                                                    )}
                                                </Button>

                                            )}

                                        </div>

                                    )}
                                />

                            </MediaUploadCheck>

                        </div>

                    ))}


                    {items.length < 6 && (

                        <Button
                            variant="primary"
                            onClick={addItem}
                        >
                            {__(
                                '+ Agregar icono',
                                'hoteles-cosmos'
                            )}
                        </Button>

                    )}

                </PanelBody>


                {/* =====================================================
                    CONFIGURACIÓN DE CONTENEDORES
                ====================================================== */}

                <PanelBody
                    title={__(
                        'Configuración de iconos',
                        'hoteles-cosmos'
                    )}
                    initialOpen={false}
                >

                    <RangeControl
                        label={__(
                            'Tamaño del icono',
                            'hoteles-cosmos'
                        )}
                        value={iconSize}
                        onChange={(value) =>
                            setAttributes({
                                iconSize: value
                            })
                        }
                        min={30}
                        max={200}
                        step={1}
                    />


                    <RangeControl
                        label={__(
                            'Separación entre contenedores',
                            'hoteles-cosmos'
                        )}
                        value={iconGap}
                        onChange={(value) =>
                            setAttributes({
                                iconGap: value
                            })
                        }
                        min={0}
                        max={100}
                        step={1}
                    />


                    <RangeControl
                        label={__(
                            'Radio de los contenedores',
                            'hoteles-cosmos'
                        )}
                        value={iconBorderRadius}
                        onChange={(value) =>
                            setAttributes({
                                iconBorderRadius: value
                            })
                        }
                        min={0}
                        max={100}
                        step={1}
                    />


                    <p style={{ marginTop: '20px' }}>
                        {__(
                            'Color de fondo del contenedor',
                            'hoteles-cosmos'
                        )}
                    </p>

                    <ColorPalette
                        value={iconBackgroundColor}
                        onChange={(value) =>
                            setAttributes({
                                iconBackgroundColor:
                                    value || '#FFFFFF'
                            })
                        }
                    />

                </PanelBody>


                {/* =====================================================
                    TEXTO
                ====================================================== */}

                <PanelBody
                    title={__('Texto', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <SelectControl
                        label={__(
                            'Alineación del texto',
                            'hoteles-cosmos'
                        )}
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


                    <RangeControl
                        label={__(
                            'Tamaño del texto',
                            'hoteles-cosmos'
                        )}
                        value={textFontSize}
                        onChange={(value) =>
                            setAttributes({
                                textFontSize: value
                            })
                        }
                        min={10}
                        max={50}
                        step={1}
                    />


                    <RangeControl
                        label={__(
                            'Separación entre icono y texto',
                            'hoteles-cosmos'
                        )}
                        value={textMarginTop}
                        onChange={(value) =>
                            setAttributes({
                                textMarginTop: value
                            })
                        }
                        min={0}
                        max={80}
                        step={1}
                    />


                    <p style={{ marginTop: '20px' }}>
                        {__(
                            'Color del texto',
                            'hoteles-cosmos'
                        )}
                    </p>

                    <ColorPalette
                        value={textColor}
                        onChange={(value) =>
                            setAttributes({
                                textColor:
                                    value || '#777777'
                            })
                        }
                    />

                </PanelBody>


                {/* =====================================================
                    ESPACIADO
                ====================================================== */}

                <PanelBody
                    title={__(
                        'Espaciado del bloque',
                        'hoteles-cosmos'
                    )}
                    initialOpen={false}
                >

                    <RangeControl
                        label={__(
                            'Padding superior',
                            'hoteles-cosmos'
                        )}
                        value={paddingTop}
                        onChange={(value) =>
                            setAttributes({
                                paddingTop: value
                            })
                        }
                        min={0}
                        max={200}
                        step={1}
                    />


                    <RangeControl
                        label={__(
                            'Padding inferior',
                            'hoteles-cosmos'
                        )}
                        value={paddingBottom}
                        onChange={(value) =>
                            setAttributes({
                                paddingBottom: value
                            })
                        }
                        min={0}
                        max={200}
                        step={1}
                    />

                </PanelBody>

            </InspectorControls>


            {/* =====================================================
                BLOQUE
            ====================================================== */}

            <section {...blockProps}>

                <div
                    className="container"
                    style={{
                        paddingTop: `${paddingTop}px`,
                        paddingBottom: `${paddingBottom}px`
                    }}
                >

                    <div
                        className="cosmos-icons-grid__items"
                        style={{
                            gap: `${iconGap}px`
                        }}
                    >

                        {items.map((item, index) => (

                            <div
                                className="cosmos-icons-grid__item"
                                key={index}
                                style={{
                                    backgroundColor:
                                        iconBackgroundColor,
                                    borderRadius:
                                        `${iconBorderRadius}px`
                                }}
                            >

                                {/* ICONO */}

                                <div
                                    className="cosmos-icons-grid__icon"
                                    style={{
                                        width: `${iconSize}px`,
                                        height: `${iconSize}px`
                                    }}
                                >

                                    {item.url ? (

                                        <img
                                            src={item.url}
                                            alt={item.alt}
                                        />

                                    ) : (

                                        <span className="cosmos-icons-grid__icon-placeholder">
                                            {__(
                                                'Icono',
                                                'hoteles-cosmos'
                                            )}
                                        </span>

                                    )}

                                </div>


                                {/* TEXTO */}

                                <RichText
                                    tagName="div"
                                    className="cosmos-icons-grid__text"
                                    value={item.text || ''}
                                    onChange={(value) =>
                                        onChangeText(
                                            value,
                                            index
                                        )
                                    }
                                    placeholder={__(
                                        'Escribe el texto...',
                                        'hoteles-cosmos'
                                    )}
                                    allowedFormats={[]}
                                    style={{
                                        color: textColor,
                                        fontSize:
                                            `${textFontSize}px`,
                                        textAlign,
                                        marginTop:
                                            `${textMarginTop}px`
                                    }}
                                />

                            </div>

                        ))}


                        {items.length === 0 && (

                            <div className="cosmos-icons-grid__empty">

                                {__(
                                    'Agrega hasta 6 iconos desde el panel lateral.',
                                    'hoteles-cosmos'
                                )}

                            </div>

                        )}

                    </div>

                </div>

            </section>

        </Fragment>
    );
}


registerBlockType('hoteles-cosmos/icons-grid', {
    edit: Edit
});