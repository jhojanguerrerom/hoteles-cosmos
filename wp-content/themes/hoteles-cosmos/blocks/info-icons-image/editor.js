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
    TextControl,
    RangeControl,
    SelectControl,
    Button,
    ColorPalette
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';


function Edit({ attributes, setAttributes }) {

    const {
        title,
        description,
        titleColor,
        descriptionColor,
        titleFontSize,
        descriptionFontSize,
        textAlign,
        backgroundColor,
        paddingTop,
        paddingBottom,
        titleMarginBottom,
        descriptionMarginBottom,
        icons,
        iconSize,
        iconBackgroundColor,
        iconGap,
        iconBorderRadius,
        imageId,
        imageUrl,
        imageAlt,
        imageMarginTop
    } = attributes;


    /*
     * AGREGAR ICONO
     */

    const addIcon = () => {

        if (icons.length >= 5) {
            return;
        }

        setAttributes({
            icons: [
                ...icons,
                {
                    id: 0,
                    url: '',
                    alt: ''
                }
            ]
        });
    };


    /*
     * ELIMINAR ICONO
     */

    const removeIcon = (index) => {

        const newIcons = [...icons];

        newIcons.splice(index, 1);

        setAttributes({
            icons: newIcons
        });
    };


    /*
     * SELECCIONAR ICONO
     */

    const onSelectIcon = (media, index) => {

        if (!media || !media.url) {
            return;
        }

        const newIcons = [...icons];

        newIcons[index] = {
            id: media.id,
            url: media.url,
            alt: media.alt || media.title || ''
        };

        setAttributes({
            icons: newIcons
        });
    };


    /*
     * IMAGEN PRINCIPAL
     */

    const onSelectImage = (media) => {

        if (!media || !media.url) {
            return;
        }

        setAttributes({
            imageId: media.id,
            imageUrl: media.url,
            imageAlt: media.alt || media.title || ''
        });
    };


    /*
     * ELIMINAR IMAGEN
     */

    const removeImage = () => {

        setAttributes({
            imageId: 0,
            imageUrl: '',
            imageAlt: ''
        });
    };


    /*
     * PROPIEDADES DEL BLOQUE
     */

    const blockProps = useBlockProps({
        className: 'cosmos-info-icons-image'
    });


    return (

        <Fragment>

            <InspectorControls>


                {/* =====================================================
                    CONTENIDO
                ====================================================== */}

                <PanelBody
                    title={__('Contenido', 'hoteles-cosmos')}
                    initialOpen={true}
                >

                    <SelectControl
                        label={__('Alineación del contenido', 'hoteles-cosmos')}
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
                        label={__('Tamaño del título', 'hoteles-cosmos')}
                        value={titleFontSize}
                        onChange={(value) =>
                            setAttributes({
                                titleFontSize: value
                            })
                        }
                        min={16}
                        max={80}
                        step={1}
                    />


                    <RangeControl
                        label={__('Margen inferior del título', 'hoteles-cosmos')}
                        value={titleMarginBottom}
                        onChange={(value) =>
                            setAttributes({
                                titleMarginBottom: value
                            })
                        }
                        min={0}
                        max={100}
                        step={1}
                    />


                    <RangeControl
                        label={__('Tamaño de descripción', 'hoteles-cosmos')}
                        value={descriptionFontSize}
                        onChange={(value) =>
                            setAttributes({
                                descriptionFontSize: value
                            })
                        }
                        min={12}
                        max={40}
                        step={1}
                    />


                    <RangeControl
                        label={__('Margen inferior de descripción', 'hoteles-cosmos')}
                        value={descriptionMarginBottom}
                        onChange={(value) =>
                            setAttributes({
                                descriptionMarginBottom: value
                            })
                        }
                        min={0}
                        max={100}
                        step={1}
                    />

                </PanelBody>


                {/* =====================================================
                    COLORES
                ====================================================== */}

                <PanelBody
                    title={__('Colores', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <p>
                        {__('Color del título', 'hoteles-cosmos')}
                    </p>

                    <ColorPalette
                        value={titleColor}
                        onChange={(value) =>
                            setAttributes({
                                titleColor: value || '#000000'
                            })
                        }
                    />


                    <p style={{ marginTop: '20px' }}>
                        {__('Color de descripción', 'hoteles-cosmos')}
                    </p>

                    <ColorPalette
                        value={descriptionColor}
                        onChange={(value) =>
                            setAttributes({
                                descriptionColor:
                                    value || '#555555'
                            })
                        }
                    />


                    <p style={{ marginTop: '20px' }}>
                        {__('Color de fondo', 'hoteles-cosmos')}
                    </p>

                    <ColorPalette
                        value={backgroundColor}
                        onChange={(value) =>
                            setAttributes({
                                backgroundColor:
                                    value || '#F5F5F5'
                            })
                        }
                    />

                </PanelBody>


                {/* =====================================================
                    ESPACIADO
                ====================================================== */}

                <PanelBody
                    title={__('Espaciado', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <RangeControl
                        label={__('Padding superior', 'hoteles-cosmos')}
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
                        label={__('Padding inferior', 'hoteles-cosmos')}
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


                {/* =====================================================
                    ICONOS
                ====================================================== */}

                <PanelBody
                    title={__(
                        `Iconos (${icons.length}/5)`,
                        'hoteles-cosmos'
                    )}
                    initialOpen={false}
                >

                    <p>
                        {__(
                            'Puedes agregar hasta 5 iconos.',
                            'hoteles-cosmos'
                        )}
                    </p>


                    {icons.map((icon, index) => (

                        <div
                            className="cosmos-icon-control"
                            key={index}
                        >

                            <div className="cosmos-icon-control__header">

                                <strong>
                                    {__('Icono', 'hoteles-cosmos')} {index + 1}
                                </strong>


                                <Button
                                    variant="link"
                                    isDestructive
                                    onClick={() =>
                                        removeIcon(index)
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
                                    value={icon.id}
                                    render={({ open }) => (

                                        <div>

                                            {icon.url ? (

                                                <>

                                                    <img
                                                        src={icon.url}
                                                        alt={icon.alt}
                                                        className="cosmos-icon-control__preview"
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


                    {icons.length < 5 && (

                        <Button
                            variant="primary"
                            onClick={addIcon}
                        >
                            {__(
                                '+ Agregar icono',
                                'hoteles-cosmos'
                            )}
                        </Button>

                    )}


                    <hr />


                    <RangeControl
                        label={__('Tamaño de los iconos', 'hoteles-cosmos')}
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
                        label={__('Separación entre iconos', 'hoteles-cosmos')}
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
                        label={__('Radio de los iconos', 'hoteles-cosmos')}
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
                        {__('Color de fondo de los iconos', 'hoteles-cosmos')}
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
                    IMAGEN
                ====================================================== */}

                <PanelBody
                    title={__('Imagen inferior', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <MediaUploadCheck>

                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={imageId}
                            render={({ open }) => (

                                <div>

                                    {imageUrl ? (

                                        <>

                                            <img
                                                src={imageUrl}
                                                alt={imageAlt}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'block',
                                                    marginBottom: '12px'
                                                }}
                                            />

                                            <Button
                                                variant="secondary"
                                                onClick={open}
                                                style={{
                                                    marginRight: '8px'
                                                }}
                                            >
                                                {__(
                                                    'Cambiar imagen',
                                                    'hoteles-cosmos'
                                                )}
                                            </Button>

                                            <Button
                                                variant="link"
                                                isDestructive
                                                onClick={removeImage}
                                            >
                                                {__(
                                                    'Eliminar',
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


                    {imageUrl && (

                        <TextControl
                            label={__(
                                'Texto alternativo',
                                'hoteles-cosmos'
                            )}
                            value={imageAlt}
                            onChange={(value) =>
                                setAttributes({
                                    imageAlt: value
                                })
                            }
                            help={__(
                                'Describe brevemente la imagen para accesibilidad y SEO.',
                                'hoteles-cosmos'
                            )}
                        />

                    )}


                    <RangeControl
                        label={__(
                            'Superposición de imagen',
                            'hoteles-cosmos'
                        )}
                        value={imageMarginTop}
                        onChange={(value) =>
                            setAttributes({
                                imageMarginTop: value
                            })
                        }
                        min={-200}
                        max={50}
                        step={1}
                        help={__(
                            'Un valor negativo hace que la imagen suba sobre el fondo.',
                            'hoteles-cosmos'
                        )}
                    />

                </PanelBody>

            </InspectorControls>


            {/* =====================================================
                BLOQUE
            ====================================================== */}

            <section {...blockProps}>

                <div
                    className="cosmos-info-icons-image__content"
                    style={{
                        backgroundColor,
                        paddingTop: `${paddingTop}px`,
                        paddingBottom: `${paddingBottom}px`
                    }}
                >

                    <div
                        className="container"
                        style={{
                            textAlign
                        }}
                    >

                        <RichText
                            tagName="h2"
                            className="cosmos-info-icons-image__title"
                            value={title}
                            onChange={(value) =>
                                setAttributes({
                                    title: value
                                })
                            }
                            placeholder={__(
                                'Título',
                                'hoteles-cosmos'
                            )}
                            allowedFormats={[]}
                            style={{
                                color: titleColor,
                                fontSize: `${titleFontSize}px`,
                                marginBottom:
                                    `${titleMarginBottom}px`
                            }}
                        />


                        <RichText
                            tagName="div"
                            className="cosmos-info-icons-image__description"
                            value={description}
                            onChange={(value) =>
                                setAttributes({
                                    description: value
                                })
                            }
                            placeholder={__(
                                'Descripción',
                                'hoteles-cosmos'
                            )}
                            allowedFormats={[]}
                            style={{
                                color: descriptionColor,
                                fontSize:
                                    `${descriptionFontSize}px`,
                                marginBottom:
                                    `${descriptionMarginBottom}px`
                            }}
                        />


                        {icons.length > 0 && (

                            <div
                                className="cosmos-info-icons-image__icons"
                                style={{
                                    gap: `${iconGap}px`
                                }}
                            >

                                {icons.map((icon, index) => (

                                    icon.url && (

                                        <div
                                            key={index}
                                            className="cosmos-info-icons-image__icon"
                                            style={{
                                                width:
                                                    `${iconSize}px`,
                                                height:
                                                    `${iconSize}px`,
                                                backgroundColor:
                                                    iconBackgroundColor,
                                                borderRadius:
                                                    `${iconBorderRadius}px`
                                            }}
                                        >

                                            <img
                                                src={icon.url}
                                                alt=""
                                            />

                                        </div>

                                    )

                                ))}

                            </div>

                        )}

                    </div>

                </div>


                {imageUrl && (

                    <div
                        className="cosmos-info-icons-image__image container"
                        style={{
                            marginTop:
                                `${imageMarginTop}px`
                        }}
                    >

                        <img
                            src={imageUrl}
                            alt={imageAlt}
                        />

                    </div>

                )}

            </section>

        </Fragment>
    );
}


registerBlockType('hoteles-cosmos/info-icons-image', {
    edit: Edit
});