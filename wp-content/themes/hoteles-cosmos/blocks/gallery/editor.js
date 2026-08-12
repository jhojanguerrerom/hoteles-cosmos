import { registerBlockType } from '@wordpress/blocks';

import {
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck
} from '@wordpress/block-editor';

import {
    PanelBody,
    SelectControl,
    RangeControl,
    Button
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { Fragment } from '@wordpress/element';


/*
 * =========================================================
 * EDITOR
 * =========================================================
 */

function Edit({ attributes, setAttributes }) {

    const {
        columns,
        widthMode,
        gap,
        imageHeight,
        borderRadius,

        image1Id,
        image1Url,
        image1Alt,

        image2Id,
        image2Url,
        image2Alt,

        image3Id,
        image3Url,
        image3Alt,

        image4Id,
        image4Url,
        image4Alt
    } = attributes;


    /*
     * =====================================================
     * IMÁGENES
     * =====================================================
     */

    const images = [
        {
            id: image1Id,
            url: image1Url,
            alt: image1Alt
        },
        {
            id: image2Id,
            url: image2Url,
            alt: image2Alt
        },
        {
            id: image3Id,
            url: image3Url,
            alt: image3Alt
        },
        {
            id: image4Id,
            url: image4Url,
            alt: image4Alt
        }
    ];


    /*
     * =====================================================
     * SELECCIONAR IMAGEN
     * =====================================================
     */

    const selectImage = (index, media) => {

        if (!media || !media.url) {
            return;
        }

        const number = index + 1;

        setAttributes({
            [`image${number}Id`]: media.id,
            [`image${number}Url`]: media.url,
            [`image${number}Alt`]:
                media.alt || media.title || ''
        });
    };


    /*
     * =====================================================
     * ELIMINAR IMAGEN
     * =====================================================
     */

    const removeImage = (index) => {

        const number = index + 1;

        setAttributes({
            [`image${number}Id`]: 0,
            [`image${number}Url`]: '',
            [`image${number}Alt`]: ''
        });
    };


    /*
     * =====================================================
     * PROPIEDADES
     * =====================================================
     */

    const blockProps = useBlockProps({
        className: `cosmos-gallery cosmos-gallery--${widthMode}`
    });


    /*
     * =====================================================
     * ESTILOS DE GRID
     * =====================================================
     */

    const gridStyle = {
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap}px`
    };


    /*
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (

        <Fragment>

            <InspectorControls>

                {/* =========================================
                    CONFIGURACIÓN
                ========================================== */}

                <PanelBody
                    title={__('Configuración de galería', 'hoteles-cosmos')}
                    initialOpen={true}
                >

                    <SelectControl
                        label={__('Número de imágenes', 'hoteles-cosmos')}
                        value={columns}
                        options={[
                            {
                                label: '1 imagen',
                                value: 1
                            },
                            {
                                label: '2 imágenes',
                                value: 2
                            },
                            {
                                label: '3 imágenes',
                                value: 3
                            },
                            {
                                label: '4 imágenes',
                                value: 4
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                columns: Number(value)
                            })
                        }
                    />


                    <SelectControl
                        label={__('Ancho del bloque', 'hoteles-cosmos')}
                        value={widthMode}
                        options={[
                            {
                                label: __('Container', 'hoteles-cosmos'),
                                value: 'container'
                            },
                            {
                                label: __('Full screen', 'hoteles-cosmos'),
                                value: 'full'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                widthMode: value
                            })
                        }
                    />


                    <RangeControl
                        label={__('Separación entre imágenes', 'hoteles-cosmos')}
                        value={gap}
                        onChange={(value) =>
                            setAttributes({
                                gap: value
                            })
                        }
                        min={0}
                        max={80}
                        step={1}
                    />


                    <RangeControl
                        label={__('Altura de las imágenes', 'hoteles-cosmos')}
                        value={imageHeight}
                        onChange={(value) =>
                            setAttributes({
                                imageHeight: value
                            })
                        }
                        min={150}
                        max={800}
                        step={10}
                    />


                    <RangeControl
                        label={__('Border radius', 'hoteles-cosmos')}
                        value={borderRadius}
                        onChange={(value) =>
                            setAttributes({
                                borderRadius: value
                            })
                        }
                        min={0}
                        max={50}
                        step={1}
                    />

                </PanelBody>


                {/* =========================================
                    IMÁGENES
                ========================================== */}

                <PanelBody
                    title={__('Imágenes', 'hoteles-cosmos')}
                    initialOpen={true}
                >

                    {images.slice(0, columns).map((image, index) => (

                        <div
                            key={index}
                            className="cosmos-gallery-editor-image-control"
                        >

                            <strong>
                                {__('Imagen', 'hoteles-cosmos')} {index + 1}
                            </strong>


                            <MediaUploadCheck>

                                <MediaUpload
                                    onSelect={(media) =>
                                        selectImage(index, media)
                                    }
                                    allowedTypes={['image']}
                                    value={image.id}
                                    render={({ open }) => (

                                        <div>

                                            {image.url ? (

                                                <>

                                                    <img
                                                        src={image.url}
                                                        alt={image.alt}
                                                        className="cosmos-gallery-editor-thumb"
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
                                                            removeImage(index)
                                                        }
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

                        </div>

                    ))}

                </PanelBody>

            </InspectorControls>


            {/* =============================================
                BLOQUE
            ============================================== */}

            <div {...blockProps}>

                <div
                    className="cosmos-gallery__inner"
                    style={gridStyle}
                >

                    {images
                        .slice(0, columns)
                        .map((image, index) => (

                            <div
                                className="cosmos-gallery__item"
                                key={index}
                                style={{
                                    height: `${imageHeight}px`,
                                    borderRadius: `${borderRadius}px`
                                }}
                            >

                                {image.url ? (

                                    <img
                                        className="cosmos-gallery__img"
                                        src={image.url}
                                        alt={image.alt}
                                    />

                                ) : (

                                    <div className="cosmos-gallery__placeholder">

                                        {__(
                                            `Selecciona la imagen ${index + 1}`,
                                            'hoteles-cosmos'
                                        )}

                                    </div>

                                )}

                            </div>

                        ))}

                </div>

            </div>

        </Fragment>
    );
}


/*
 * =========================================================
 * REGISTRO
 * =========================================================
 */

registerBlockType('hoteles-cosmos/gallery', {
    edit: Edit
});