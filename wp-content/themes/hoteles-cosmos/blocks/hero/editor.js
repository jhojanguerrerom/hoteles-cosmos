import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import {
    useBlockProps,
    RichText,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
    URLInput
} from '@wordpress/block-editor';

import {
    PanelBody,
    TextControl,
    RangeControl,
    SelectControl,
    Button
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

function Edit({ attributes, setAttributes }) {

    const {
        eyebrow,
        title,
        subtitle,
        imageId,
        imageUrl,
        imageAlt,
        buttonText,
        buttonUrl,
        overlay,
        contentWidth
    } = attributes;


    /*
     * IMAGEN
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
        className: `cosmos-hero cosmos-hero--${contentWidth}`
    });


    return (

        <Fragment>

            <InspectorControls>

                <PanelBody
                    title={__('Imagen del Hero', 'hoteles-cosmos')}
                    initialOpen={true}
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
                                                {__('Cambiar imagen', 'hoteles-cosmos')}
                                            </Button>

                                            <Button
                                                variant="link"
                                                isDestructive
                                                onClick={removeImage}
                                            >
                                                {__('Eliminar', 'hoteles-cosmos')}
                                            </Button>

                                        </>

                                    ) : (

                                        <Button
                                            variant="primary"
                                            onClick={open}
                                        >
                                            {__('Seleccionar imagen', 'hoteles-cosmos')}
                                        </Button>

                                    )}

                                </div>

                            )}
                        />

                    </MediaUploadCheck>


                    {imageUrl && (

                        <TextControl
                            label={__('Texto alternativo', 'hoteles-cosmos')}
                            value={imageAlt}
                            onChange={(value) =>
                                setAttributes({
                                    imageAlt: value
                                })
                            }
                            help={__(
                                'Describe brevemente la imagen. Es importante para accesibilidad y SEO.',
                                'hoteles-cosmos'
                            )}
                        />

                    )}

                </PanelBody>


                <PanelBody
                    title={__('Apariencia', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <RangeControl
                        label={__('Oscurecimiento de imagen', 'hoteles-cosmos')}
                        value={overlay}
                        onChange={(value) =>
                            setAttributes({
                                overlay: value
                            })
                        }
                        min={0}
                        max={90}
                        step={5}
                        help={__(
                            'Controla la intensidad de la máscara sobre la imagen.',
                            'hoteles-cosmos'
                        )}
                    />


                    <SelectControl
                        label={__('Ancho del contenido', 'hoteles-cosmos')}
                        value={contentWidth}
                        options={[
                            {
                                label: __('Estrecho', 'hoteles-cosmos'),
                                value: 'small'
                            },
                            {
                                label: __('Medio', 'hoteles-cosmos'),
                                value: 'medium'
                            },
                            {
                                label: __('Amplio', 'hoteles-cosmos'),
                                value: 'large'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                contentWidth: value
                            })
                        }
                    />

                </PanelBody>


                <PanelBody
                    title={__('Botón / CTA', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <TextControl
                        label={__('Texto del botón', 'hoteles-cosmos')}
                        value={buttonText}
                        placeholder={__('Ej: Reservar ahora', 'hoteles-cosmos')}
                        onChange={(value) =>
                            setAttributes({
                                buttonText: value
                            })
                        }
                    />


                    <div style={{ marginTop: '16px' }}>

                        <label
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '500'
                            }}
                        >
                            {__('URL del botón', 'hoteles-cosmos')}
                        </label>

                        <URLInput
                            value={buttonUrl}
                            onChange={(value) =>
                                setAttributes({
                                    buttonUrl: value
                                })
                            }
                        />

                    </div>

                </PanelBody>

            </InspectorControls>


            <section {...blockProps}>

                <div className="cosmos-hero__preview">

                    {imageUrl ? (

                        <img
                            className="cosmos-hero__image"
                            src={imageUrl}
                            alt=""
                        />

                    ) : (

                        <div className="cosmos-hero__image-placeholder">
                            {__('Selecciona una imagen para comenzar', 'hoteles-cosmos')}
                        </div>

                    )}


                    <div
                        className="cosmos-hero__overlay"
                        style={{
                            opacity: overlay / 100
                        }}
                    />


                    <div className="container">

                        <div className="cosmos-hero__content">

                            <RichText
                                tagName="div"
                                className="cosmos-hero__eyebrow"
                                value={eyebrow}
                                onChange={(value) =>
                                    setAttributes({
                                        eyebrow: value
                                    })
                                }
                                placeholder={__('Texto pequeño / categoría', 'hoteles-cosmos')}
                                allowedFormats={[]}
                            />


                            <RichText
                                tagName="h1"
                                className="cosmos-hero__title"
                                value={title}
                                onChange={(value) =>
                                    setAttributes({
                                        title: value
                                    })
                                }
                                placeholder={__('Título principal', 'hoteles-cosmos')}
                                allowedFormats={[]}
                            />


                            <RichText
                                tagName="p"
                                className="cosmos-hero__subtitle"
                                value={subtitle}
                                onChange={(value) =>
                                    setAttributes({
                                        subtitle: value
                                    })
                                }
                                placeholder={__('Subtítulo o descripción', 'hoteles-cosmos')}
                                allowedFormats={[]}
                            />


                            {buttonText && (

                                <div className="cosmos-hero__button-preview">
                                    {buttonText}
                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </section>

        </Fragment>
    );
}

registerBlockType('hoteles-cosmos/hero', {
    edit: Edit
});