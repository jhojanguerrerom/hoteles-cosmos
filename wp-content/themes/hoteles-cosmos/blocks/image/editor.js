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
    SelectControl,
    RangeControl,
    Button
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';


function Edit({ attributes, setAttributes }) {

    const {
        imageId,
        imageUrl,
        imageAlt,
        widthMode,
        imageWidth,
        alignment,
        borderRadius
    } = attributes;


    /*
     * =====================================================
     * IMAGEN
     * =====================================================
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
     * =====================================================
     * ELIMINAR IMAGEN
     * =====================================================
     */

    const removeImage = () => {

        setAttributes({
            imageId: 0,
            imageUrl: '',
            imageAlt: ''
        });
    };


    /*
     * =====================================================
     * CLASES
     * =====================================================
     */

    const blockClasses = [
        'cosmos-image',
        `cosmos-image--${widthMode}`,
        `cosmos-image--${imageWidth}`,
        `cosmos-image--align-${alignment}`
    ].join(' ');


    /*
     * =====================================================
     * PROPIEDADES DEL BLOQUE
     * =====================================================
     */

    const blockProps = useBlockProps({
        className: blockClasses
    });


    /*
     * =====================================================
     * ESTILO DE IMAGEN
     * =====================================================
     */

    const imageStyle = {
        borderRadius: `${borderRadius}px`
    };


    return (

        <Fragment>

            <InspectorControls>


                {/* =================================================
                    IMAGEN
                ================================================= */}

                <PanelBody
                    title={__('Imagen', 'hoteles-cosmos')}
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
                                                    marginBottom: '12px',
                                                    borderRadius: `${borderRadius}px`
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

                </PanelBody>


                {/* =================================================
                    ANCHO
                ================================================= */}

                <PanelBody
                    title={__('Ancho', 'hoteles-cosmos')}
                    initialOpen={true}
                >

                    <SelectControl
                        label={__('Ancho del bloque', 'hoteles-cosmos')}
                        value={widthMode}
                        options={[
                            {
                                label: __('Container', 'hoteles-cosmos'),
                                value: 'container'
                            },
                            {
                                label: __('Full width', 'hoteles-cosmos'),
                                value: 'full'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                widthMode: value
                            })
                        }
                    />


                    <SelectControl
                        label={__('Ancho de la imagen', 'hoteles-cosmos')}
                        value={imageWidth}
                        options={[
                            {
                                label: __('Automático', 'hoteles-cosmos'),
                                value: 'auto'
                            },
                            {
                                label: __('100% del ancho disponible', 'hoteles-cosmos'),
                                value: 'full'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                imageWidth: value
                            })
                        }
                    />

                </PanelBody>


                {/* =================================================
                    ALINEACIÓN
                ================================================= */}

                <PanelBody
                    title={__('Alineación', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <SelectControl
                        label={__('Posición de la imagen', 'hoteles-cosmos')}
                        value={alignment}
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
                                alignment: value
                            })
                        }
                    />

                </PanelBody>


                {/* =================================================
                    BORDES
                ================================================= */}

                <PanelBody
                    title={__('Bordes', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <RangeControl
                        label={__('Radio de los bordes', 'hoteles-cosmos')}
                        value={borderRadius}
                        onChange={(value) =>
                            setAttributes({
                                borderRadius: value
                            })
                        }
                        min={0}
                        max={50}
                        step={1}
                        help={__(
                            '0 px = imagen cuadrada. Puedes elegir hasta 50 px.',
                            'hoteles-cosmos'
                        )}
                    />

                </PanelBody>

            </InspectorControls>


            {/* =====================================================
                VISTA DEL BLOQUE
            ===================================================== */}

            <div {...blockProps}>

                <div className="cosmos-image__inner">

                    {imageUrl ? (

                        <img
                            className="cosmos-image__img"
                            src={imageUrl}
                            alt={imageAlt}
                            style={imageStyle}
                        />

                    ) : (

                        <div className="cosmos-image__placeholder">

                            {__(
                                'Selecciona una imagen para comenzar',
                                'hoteles-cosmos'
                            )}

                        </div>

                    )}

                </div>

            </div>

        </Fragment>
    );
}


registerBlockType('hoteles-cosmos/image', {
    edit: Edit
});