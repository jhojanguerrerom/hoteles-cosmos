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
    TextControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';


function Edit({ attributes, setAttributes }) {

    const {
        imageOneId,
        imageOneUrl,
        imageOneAlt,

        imageTwoId,
        imageTwoUrl,
        imageTwoAlt,

        title,
        highlight,
        content
    } = attributes;


    /*
     * =====================================================
     * IMAGEN 1
     * =====================================================
     */

    const onSelectImageOne = (media) => {

        if (!media || !media.url) {
            return;
        }

        setAttributes({
            imageOneId: media.id,
            imageOneUrl: media.url,
            imageOneAlt: media.alt || media.title || ''
        });

    };


    const removeImageOne = () => {

        setAttributes({
            imageOneId: 0,
            imageOneUrl: '',
            imageOneAlt: ''
        });

    };


    /*
     * =====================================================
     * IMAGEN 2
     * =====================================================
     */

    const onSelectImageTwo = (media) => {

        if (!media || !media.url) {
            return;
        }

        setAttributes({
            imageTwoId: media.id,
            imageTwoUrl: media.url,
            imageTwoAlt: media.alt || media.title || ''
        });

    };


    const removeImageTwo = () => {

        setAttributes({
            imageTwoId: 0,
            imageTwoUrl: '',
            imageTwoAlt: ''
        });

    };


    /*
     * =====================================================
     * PROPIEDADES
     * =====================================================
     */

    const blockProps = useBlockProps({
        className: 'cosmos-overlap-content'
    });


    return (

        <Fragment>


            {/* =================================================
               CONTROLES
            ================================================= */}

            <InspectorControls>


                {/* =================================================
                   IMAGEN 1
                ================================================= */}

                <PanelBody
                    title={__('Imagen principal', 'hoteles-cosmos')}
                    initialOpen={true}
                >

                    <MediaUploadCheck>

                        <MediaUpload
                            onSelect={onSelectImageOne}
                            allowedTypes={['image']}
                            value={imageOneId}
                            render={({ open }) => (

                                <div>

                                    {imageOneUrl ? (

                                        <>

                                            <img
                                                src={imageOneUrl}
                                                alt={imageOneAlt}
                                                style={{
                                                    width: '100%',
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
                                                onClick={removeImageOne}
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


                    {imageOneUrl && (

                        <TextControl
                            label={__(
                                'Texto alternativo',
                                'hoteles-cosmos'
                            )}
                            value={imageOneAlt}
                            onChange={(value) =>
                                setAttributes({
                                    imageOneAlt: value
                                })
                            }
                        />

                    )}

                </PanelBody>


                {/* =================================================
                   IMAGEN 2
                ================================================= */}

                <PanelBody
                    title={__('Imagen secundaria', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <MediaUploadCheck>

                        <MediaUpload
                            onSelect={onSelectImageTwo}
                            allowedTypes={['image']}
                            value={imageTwoId}
                            render={({ open }) => (

                                <div>

                                    {imageTwoUrl ? (

                                        <>

                                            <img
                                                src={imageTwoUrl}
                                                alt={imageTwoAlt}
                                                style={{
                                                    width: '100%',
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
                                                onClick={removeImageTwo}
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


                    {imageTwoUrl && (

                        <TextControl
                            label={__(
                                'Texto alternativo',
                                'hoteles-cosmos'
                            )}
                            value={imageTwoAlt}
                            onChange={(value) =>
                                setAttributes({
                                    imageTwoAlt: value
                                })
                            }
                        />

                    )}

                </PanelBody>


            </InspectorControls>


            {/* =================================================
               BLOQUE
            ================================================= */}

            <section {...blockProps}>


                <div className="container">


                    <div className="cosmos-overlap-content__grid">


                        {/* =================================================
                           COLUMNA IMÁGENES — 40%
                        ================================================= */}

                        <div className="cosmos-overlap-content__images">


                            <div className="cosmos-overlap-content__image-one">

                                {imageOneUrl ? (

                                    <img
                                        src={imageOneUrl}
                                        alt=""
                                    />

                                ) : (

                                    <div className="cosmos-overlap-content__placeholder">
                                        {__(
                                            'Selecciona la imagen principal',
                                            'hoteles-cosmos'
                                        )}
                                    </div>

                                )}

                            </div>


                            <div className="cosmos-overlap-content__image-two">

                                {imageTwoUrl ? (

                                    <img
                                        src={imageTwoUrl}
                                        alt=""
                                    />

                                ) : (

                                    <div className="cosmos-overlap-content__placeholder">
                                        {__(
                                            'Selecciona la segunda imagen',
                                            'hoteles-cosmos'
                                        )}
                                    </div>

                                )}

                            </div>


                        </div>


                        {/* =================================================
                           COLUMNA TEXTO — 60%
                        ================================================= */}

                        <div className="cosmos-overlap-content__text">


                            <RichText
                                tagName="h2"
                                className="cosmos-overlap-content__title"
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
                            />


                            <RichText
                                tagName="strong"
                                className="cosmos-overlap-content__highlight"
                                value={highlight}
                                onChange={(value) =>
                                    setAttributes({
                                        highlight: value
                                    })
                                }
                                placeholder={__(
                                    'Palabra destacada',
                                    'hoteles-cosmos'
                                )}
                                allowedFormats={[]}
                            />


                            <RichText
                                tagName="div"
                                className="cosmos-overlap-content__description"
                                value={content}
                                onChange={(value) =>
                                    setAttributes({
                                        content: value
                                    })
                                }
                                placeholder={__(
                                    'Escribe aquí el contenido...',
                                    'hoteles-cosmos'
                                )}
                                allowedFormats={[
                                    'core/bold',
                                    'core/italic',
                                    'core/link'
                                ]}
                            />


                        </div>


                    </div>


                </div>


            </section>

        </Fragment>

    );

}


registerBlockType(
    'hoteles-cosmos/overlap-content',
    {
        edit: Edit
    }
);