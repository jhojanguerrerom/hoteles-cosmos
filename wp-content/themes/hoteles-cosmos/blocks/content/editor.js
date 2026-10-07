import {
    InspectorControls,
    RichText,
    URLInput
} from '@wordpress/block-editor';

import {
    PanelBody,
    ToggleControl,
    SelectControl,
    RangeControl,
    ColorPalette,
    TextControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

import metadata from './block.json';

import { registerBlockType } from '@wordpress/blocks';


/*
|--------------------------------------------------------------------------
| REGISTRO DEL BLOQUE
|--------------------------------------------------------------------------
*/

registerBlockType(
    metadata.name,
    {
        ...metadata,

        edit: Edit,

        save: () => null
    }
);


/*
|--------------------------------------------------------------------------
| EDITOR
|--------------------------------------------------------------------------
*/

function Edit({
    attributes,
    setAttributes
}) {

    const {

        width,
        alignment,
        backgroundColor,

        marginTop,
        marginBottom,

        showTag,
        tagText,
        tagColor,
        tagBackground,
        tagFontSize,
        tagFontWeight,
        tagPaddingTop,
        tagPaddingRight,
        tagPaddingBottom,
        tagPaddingLeft,
        tagMarginTop,
        tagMarginBottom,
        tagBorderRadius,

        showTitle,
        title,
        titleColor,
        titleFontSize,
        titleFontWeight,
        titleLineHeight,
        titleMarginTop,
        titleMarginBottom,

        showDescription,
        description,
        descriptionColor,
        descriptionFontSize,
        descriptionFontWeight,
        descriptionLineHeight,
        descriptionMarginTop,
        descriptionMarginBottom,

        showButton,
        buttonText,
        buttonUrl,
        buttonTarget,
        buttonColor,
        buttonBackground,
        buttonHoverColor,
        buttonHoverBackground,
        buttonFontSize,
        buttonFontWeight,
        buttonPaddingTop,
        buttonPaddingRight,
        buttonPaddingBottom,
        buttonPaddingLeft,
        buttonBorderColor,
        buttonBorderWidth,
        buttonBorderRadius,
        buttonMarginTop,
        buttonMarginBottom

    } = attributes;


    /*
    |--------------------------------------------------------------------------
    | VARIABLES CSS
    |--------------------------------------------------------------------------
    */

    const style = {

        '--cosmos-content-background':
            backgroundColor,

        '--cosmos-content-margin-top':
            `${marginTop}px`,

        '--cosmos-content-margin-bottom':
            `${marginBottom}px`,


        '--cosmos-content-tag-color':
            tagColor,

        '--cosmos-content-tag-background':
            tagBackground,

        '--cosmos-content-tag-size':
            `${tagFontSize}px`,

        '--cosmos-content-tag-weight':
            tagFontWeight,

        '--cosmos-content-tag-padding-top':
            `${tagPaddingTop}px`,

        '--cosmos-content-tag-padding-right':
            `${tagPaddingRight}px`,

        '--cosmos-content-tag-padding-bottom':
            `${tagPaddingBottom}px`,

        '--cosmos-content-tag-padding-left':
            `${tagPaddingLeft}px`,

        '--cosmos-content-tag-margin-top':
            `${tagMarginTop}px`,

        '--cosmos-content-tag-margin-bottom':
            `${tagMarginBottom}px`,

        '--cosmos-content-tag-radius':
            `${tagBorderRadius}px`,


        '--cosmos-content-title-color':
            titleColor,

        '--cosmos-content-title-size':
            `${titleFontSize}px`,

        '--cosmos-content-title-weight':
            titleFontWeight,

        '--cosmos-content-title-line-height':
            titleLineHeight,

        '--cosmos-content-title-margin-top':
            `${titleMarginTop}px`,

        '--cosmos-content-title-margin-bottom':
            `${titleMarginBottom}px`,


        '--cosmos-content-description-color':
            descriptionColor,

        '--cosmos-content-description-size':
            `${descriptionFontSize}px`,

        '--cosmos-content-description-weight':
            descriptionFontWeight,

        '--cosmos-content-description-line-height':
            descriptionLineHeight,

        '--cosmos-content-description-margin-top':
            `${descriptionMarginTop}px`,

        '--cosmos-content-description-margin-bottom':
            `${descriptionMarginBottom}px`,


        '--cosmos-content-button-color':
            buttonColor,

        '--cosmos-content-button-background':
            buttonBackground,

        '--cosmos-content-button-hover-color':
            buttonHoverColor,

        '--cosmos-content-button-hover-background':
            buttonHoverBackground,

        '--cosmos-content-button-size':
            `${buttonFontSize}px`,

        '--cosmos-content-button-weight':
            buttonFontWeight,

        '--cosmos-content-button-padding-top':
            `${buttonPaddingTop}px`,

        '--cosmos-content-button-padding-right':
            `${buttonPaddingRight}px`,

        '--cosmos-content-button-padding-bottom':
            `${buttonPaddingBottom}px`,

        '--cosmos-content-button-padding-left':
            `${buttonPaddingLeft}px`,

        '--cosmos-content-button-border-color':
            buttonBorderColor,

        '--cosmos-content-button-border-width':
            `${buttonBorderWidth}px`,

        '--cosmos-content-button-radius':
            `${buttonBorderRadius}px`,

        '--cosmos-content-button-margin-top':
            `${buttonMarginTop}px`,

        '--cosmos-content-button-margin-bottom':
            `${buttonMarginBottom}px`
    };


    /*
    |--------------------------------------------------------------------------
    | CONTROLES
    |--------------------------------------------------------------------------
    */

    return (
        <Fragment>

            <InspectorControls>


                {/* ==================================================
                    CONFIGURACIÓN GENERAL
                ================================================== */}

                <PanelBody
                    title="Configuración general"
                    initialOpen={true}
                >

                    <SelectControl
                        label="Ancho"
                        value={width}
                        options={[
                            {
                                label: 'Container',
                                value: 'container'
                            },
                            {
                                label: 'Full width',
                                value: 'full'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                width: value
                            })
                        }
                    />

                    <SelectControl
                        label="Alineación"
                        value={alignment}
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
                                alignment: value
                            })
                        }
                    />

                    <p>Color de fondo</p>

                    <ColorPalette
                        value={backgroundColor}
                        onChange={(value) =>
                            setAttributes({
                                backgroundColor:
                                    value || '#FFFFFF'
                            })
                        }
                    />

                    <RangeControl
                        label="Margen superior"
                        value={marginTop}
                        min={0}
                        max={200}
                        onChange={(value) =>
                            setAttributes({
                                marginTop: value
                            })
                        }
                    />

                    <RangeControl
                        label="Margen inferior"
                        value={marginBottom}
                        min={0}
                        max={200}
                        onChange={(value) =>
                            setAttributes({
                                marginBottom: value
                            })
                        }
                    />

                </PanelBody>


                {/* ==================================================
                    TAG
                ================================================== */}

                <PanelBody
                    title="Tag"
                    initialOpen={false}
                >

                    <ToggleControl
                        label="Mostrar tag"
                        checked={showTag}
                        onChange={(value) =>
                            setAttributes({
                                showTag: value
                            })
                        }
                    />

                    {showTag && (
                        <>

                            <TextControl
                                label="Texto"
                                value={tagText}
                                onChange={(value) =>
                                    setAttributes({
                                        tagText: value
                                    })
                                }
                            />

                            <p>Color del texto</p>

                            <ColorPalette
                                value={tagColor}
                                onChange={(value) =>
                                    setAttributes({
                                        tagColor: value
                                    })
                                }
                            />

                            <p>Color de fondo</p>

                            <ColorPalette
                                value={tagBackground}
                                onChange={(value) =>
                                    setAttributes({
                                        tagBackground: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Tamaño"
                                value={tagFontSize}
                                min={8}
                                max={50}
                                onChange={(value) =>
                                    setAttributes({
                                        tagFontSize: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Peso"
                                value={tagFontWeight}
                                min={300}
                                max={900}
                                step={100}
                                onChange={(value) =>
                                    setAttributes({
                                        tagFontWeight: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Padding superior"
                                value={tagPaddingTop}
                                min={0}
                                max={50}
                                onChange={(value) =>
                                    setAttributes({
                                        tagPaddingTop: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Padding derecho"
                                value={tagPaddingRight}
                                min={0}
                                max={80}
                                onChange={(value) =>
                                    setAttributes({
                                        tagPaddingRight: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Padding inferior"
                                value={tagPaddingBottom}
                                min={0}
                                max={50}
                                onChange={(value) =>
                                    setAttributes({
                                        tagPaddingBottom: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Padding izquierdo"
                                value={tagPaddingLeft}
                                min={0}
                                max={80}
                                onChange={(value) =>
                                    setAttributes({
                                        tagPaddingLeft: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Margen superior"
                                value={tagMarginTop}
                                min={0}
                                max={100}
                                onChange={(value) =>
                                    setAttributes({
                                        tagMarginTop: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Margen inferior"
                                value={tagMarginBottom}
                                min={0}
                                max={100}
                                onChange={(value) =>
                                    setAttributes({
                                        tagMarginBottom: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Radio"
                                value={tagBorderRadius}
                                min={0}
                                max={60}
                                onChange={(value) =>
                                    setAttributes({
                                        tagBorderRadius: value
                                    })
                                }
                            />

                        </>
                    )}

                </PanelBody>


                {/* ==================================================
                    TÍTULO
                ================================================== */}

                <PanelBody
                    title="Título"
                    initialOpen={false}
                >

                    <ToggleControl
                        label="Mostrar título"
                        checked={showTitle}
                        onChange={(value) =>
                            setAttributes({
                                showTitle: value
                            })
                        }
                    />

                    {showTitle && (
                        <>

                            <RangeControl
                                label="Tamaño"
                                value={titleFontSize}
                                min={12}
                                max={100}
                                onChange={(value) =>
                                    setAttributes({
                                        titleFontSize: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Peso"
                                value={titleFontWeight}
                                min={300}
                                max={900}
                                step={100}
                                onChange={(value) =>
                                    setAttributes({
                                        titleFontWeight: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Interlineado"
                                value={titleLineHeight}
                                min={0.8}
                                max={2}
                                step={0.1}
                                onChange={(value) =>
                                    setAttributes({
                                        titleLineHeight: value
                                    })
                                }
                            />

                            <p>Color</p>

                            <ColorPalette
                                value={titleColor}
                                onChange={(value) =>
                                    setAttributes({
                                        titleColor: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Margen superior"
                                value={titleMarginTop}
                                min={0}
                                max={100}
                                onChange={(value) =>
                                    setAttributes({
                                        titleMarginTop: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Margen inferior"
                                value={titleMarginBottom}
                                min={0}
                                max={100}
                                onChange={(value) =>
                                    setAttributes({
                                        titleMarginBottom: value
                                    })
                                }
                            />

                        </>
                    )}

                </PanelBody>


                {/* ==================================================
                    DESCRIPCIÓN
                ================================================== */}

                <PanelBody
                    title="Descripción"
                    initialOpen={false}
                >

                    <ToggleControl
                        label="Mostrar descripción"
                        checked={showDescription}
                        onChange={(value) =>
                            setAttributes({
                                showDescription: value
                            })
                        }
                    />

                    {showDescription && (
                        <>

                            <RangeControl
                                label="Tamaño"
                                value={descriptionFontSize}
                                min={10}
                                max={60}
                                onChange={(value) =>
                                    setAttributes({
                                        descriptionFontSize: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Peso"
                                value={descriptionFontWeight}
                                min={300}
                                max={900}
                                step={100}
                                onChange={(value) =>
                                    setAttributes({
                                        descriptionFontWeight: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Interlineado"
                                value={descriptionLineHeight}
                                min={0.8}
                                max={2.5}
                                step={0.1}
                                onChange={(value) =>
                                    setAttributes({
                                        descriptionLineHeight: value
                                    })
                                }
                            />

                            <p>Color</p>

                            <ColorPalette
                                value={descriptionColor}
                                onChange={(value) =>
                                    setAttributes({
                                        descriptionColor: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Margen superior"
                                value={descriptionMarginTop}
                                min={0}
                                max={100}
                                onChange={(value) =>
                                    setAttributes({
                                        descriptionMarginTop: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Margen inferior"
                                value={descriptionMarginBottom}
                                min={0}
                                max={100}
                                onChange={(value) =>
                                    setAttributes({
                                        descriptionMarginBottom: value
                                    })
                                }
                            />

                        </>
                    )}

                </PanelBody>


                {/* ==================================================
                    BOTÓN
                ================================================== */}

                <PanelBody
                    title="Botón"
                    initialOpen={false}
                >

                    <ToggleControl
                        label="Mostrar botón"
                        checked={showButton}
                        onChange={(value) =>
                            setAttributes({
                                showButton: value
                            })
                        }
                    />

                    {showButton && (
                        <>

                            <TextControl
                                label="Texto"
                                value={buttonText}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonText: value
                                    })
                                }
                            />

                            <URLInput
                                value={buttonUrl}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonUrl: value
                                    })
                                }
                            />

                            <SelectControl
                                label="Destino"
                                value={buttonTarget}
                                options={[
                                    {
                                        label: 'Misma pestaña',
                                        value: '_self'
                                    },
                                    {
                                        label: 'Nueva pestaña',
                                        value: '_blank'
                                    }
                                ]}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonTarget: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Tamaño"
                                value={buttonFontSize}
                                min={10}
                                max={50}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonFontSize: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Peso"
                                value={buttonFontWeight}
                                min={300}
                                max={900}
                                step={100}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonFontWeight: value
                                    })
                                }
                            />

                            <p>Color del texto</p>

                            <ColorPalette
                                value={buttonColor}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonColor: value
                                    })
                                }
                            />

                            <p>Color de fondo</p>

                            <ColorPalette
                                value={buttonBackground}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonBackground: value
                                    })
                                }
                            />

                            <p>Color texto hover</p>

                            <ColorPalette
                                value={buttonHoverColor}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonHoverColor: value
                                    })
                                }
                            />

                            <p>Color fondo hover</p>

                            <ColorPalette
                                value={buttonHoverBackground}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonHoverBackground: value
                                    })
                                }
                            />

                            <p>Color del borde</p>

                            <ColorPalette
                                value={buttonBorderColor}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonBorderColor: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Ancho del borde"
                                value={buttonBorderWidth}
                                min={0}
                                max={10}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonBorderWidth: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Radio"
                                value={buttonBorderRadius}
                                min={0}
                                max={60}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonBorderRadius: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Padding superior"
                                value={buttonPaddingTop}
                                min={0}
                                max={50}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonPaddingTop: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Padding derecho"
                                value={buttonPaddingRight}
                                min={0}
                                max={80}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonPaddingRight: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Padding inferior"
                                value={buttonPaddingBottom}
                                min={0}
                                max={50}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonPaddingBottom: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Padding izquierdo"
                                value={buttonPaddingLeft}
                                min={0}
                                max={80}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonPaddingLeft: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Margen superior"
                                value={buttonMarginTop}
                                min={0}
                                max={100}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonMarginTop: value
                                    })
                                }
                            />

                            <RangeControl
                                label="Margen inferior"
                                value={buttonMarginBottom}
                                min={0}
                                max={100}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonMarginBottom: value
                                    })
                                }
                            />

                        </>
                    )}

                </PanelBody>

            </InspectorControls>


            {/* ==================================================
                BLOQUE
            ================================================== */}

            <section
                className={
                    `cosmos-content cosmos-content--${width} cosmos-content--align-${alignment}`
                }
                style={style}
            >

                <div className="cosmos-content__inner">


                    {/* ==================================================
                        TAG
                    ================================================== */}

                    {showTag && (

                        <div className="cosmos-content__tag">

                            <RichText
                                tagName="span"
                                value={tagText}
                                onChange={(value) =>
                                    setAttributes({
                                        tagText: value
                                    })
                                }
                                placeholder="Tag..."
                                allowedFormats={[]}
                            />

                        </div>

                    )}


                    {/* ==================================================
                        TÍTULO
                    ================================================== */}

                    {showTitle && (

                        <RichText
                            tagName="h2"
                            className="cosmos-content__title"
                            value={title}
                            onChange={(value) =>
                                setAttributes({
                                    title: value
                                })
                            }
                            placeholder="Título..."
                        />

                    )}


                    {/* ==================================================
                        DESCRIPCIÓN
                    ================================================== */}

                    {showDescription && (

                        <RichText
                            tagName="div"
                            className="cosmos-content__description"
                            value={description}
                            onChange={(value) =>
                                setAttributes({
                                    description: value
                                })
                            }
                            placeholder="Descripción..."
                        />

                    )}


                    {/* ==================================================
                        BOTÓN
                    ================================================== */}

                    {showButton && (

                        <div className="cosmos-content__button-wrapper">

                            <RichText
                                tagName="span"
                                className="cosmos-content__button"
                                value={buttonText}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonText: value
                                    })
                                }
                                placeholder="Texto del botón..."
                                allowedFormats={[]}
                            />

                        </div>

                    )}

                </div>

            </section>
        </Fragment>
    );
}