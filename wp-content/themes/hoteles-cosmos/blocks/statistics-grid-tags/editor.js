import metadata from './block.json';

import {
    registerBlockType
} from '@wordpress/blocks';

import {
    useBlockProps,
    InspectorControls,
    ColorPalette,
    RichText
} from '@wordpress/block-editor';

import {
    PanelBody,
    Button,
    RangeControl,
    TextControl,
    SelectControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

import './style.css';
import './editor.css';


function Edit({ attributes, setAttributes }) {

    const {
        row1,
        row2,

        numberColor,
        textColor,

        numberSize,
        textSize,

        numberWeight,
        textWeight,

        lineColor,
        lineWidth,

        animationDuration,
        animationDecimals,

        columnGap,
        rowGap,

        sectionPaddingTop,
        sectionPaddingBottom,

        contentWidth,

        backgroundColor,

        tagBackground,
        tagTextColor,
        tagBorderRadius,
        tagAlignment,
        tagPaddingVertical,
        tagPaddingHorizontal,
        tagFontSize,
        tagWeight

    } = attributes;


    /*
     * =====================================================
     * BLOCK PROPS
     * =====================================================
     */

    const blockProps = useBlockProps({
        className: [
            'cosmos-statistics-grid-tags',
            `cosmos-statistics-grid-tags--${contentWidth || 'container'}`
        ].join(' '),

        style: {

            '--cosmos-statistics-number-color':
                numberColor,

            '--cosmos-statistics-text-color':
                textColor,

            '--cosmos-statistics-number-size':
                `${numberSize}px`,

            '--cosmos-statistics-text-size':
                `${textSize}px`,

            '--cosmos-statistics-number-weight':
                numberWeight,

            '--cosmos-statistics-text-weight':
                textWeight,

            '--cosmos-statistics-line-color':
                lineColor,

            '--cosmos-statistics-line-width':
                `${lineWidth}px`,

            '--cosmos-statistics-column-gap':
                `${columnGap}px`,

            '--cosmos-statistics-row-gap':
                `${rowGap}px`,

            '--cosmos-statistics-padding-top':
                `${sectionPaddingTop}px`,

            '--cosmos-statistics-padding-bottom':
                `${sectionPaddingBottom}px`,

            '--cosmos-statistics-background':
                backgroundColor,

            '--cosmos-statistics-tag-background':
                tagBackground,

            '--cosmos-statistics-tag-color':
                tagTextColor,

            '--cosmos-statistics-tag-radius':
                `${tagBorderRadius}px`,

            '--cosmos-statistics-tag-padding-y':
                `${tagPaddingVertical}px`,

            '--cosmos-statistics-tag-padding-x':
                `${tagPaddingHorizontal}px`,

            '--cosmos-statistics-tag-size':
                `${tagFontSize}px`,

            '--cosmos-statistics-tag-weight':
                tagWeight
        }
    });


    /*
     * =====================================================
     * ACTUALIZAR ITEM
     * =====================================================
     */

    const updateItem = (
        row,
        index,
        field,
        value
    ) => {

        const current =
            row === 1
                ? [...row1]
                : [...row2];

        current[index] = {
            ...current[index],
            [field]: value
        };

        setAttributes(
            row === 1
                ? { row1: current }
                : { row2: current }
        );
    };


    /*
     * =====================================================
     * AGREGAR ITEM
     * =====================================================
     */

    const addItem = (row) => {

        const current =
            row === 1
                ? [...row1]
                : [...row2];

        if (current.length >= 5) {
            return;
        }

        current.push({
            number: 0,
            prefix: '',
            suffix: '',
            text: '',
            tag: ''
        });

        setAttributes(
            row === 1
                ? { row1: current }
                : { row2: current }
        );
    };


    /*
     * =====================================================
     * ELIMINAR ITEM
     * =====================================================
     */

    const removeItem = (
        row,
        index
    ) => {

        const current =
            row === 1
                ? [...row1]
                : [...row2];

        current.splice(index, 1);

        setAttributes(
            row === 1
                ? { row1: current }
                : { row2: current }
        );
    };


    /*
     * =====================================================
     * ALINEACIÓN DEL TAG
     * =====================================================
     */

    const getTagAlignmentStyle = () => {

        switch (tagAlignment) {

            case 'left':

                return {
                    marginLeft: '0',
                    marginRight: 'auto'
                };

            case 'right':

                return {
                    marginLeft: 'auto',
                    marginRight: '0'
                };

            case 'center':

            default:

                return {
                    marginLeft: 'auto',
                    marginRight: 'auto'
                };
        }
    };


    /*
     * =====================================================
     * RENDER EDITOR ITEM
     * =====================================================
     */

    const renderEditorItem = (
        item,
        index,
        row
    ) => {

        return (

            <div
                className="cosmos-statistics-tags-editor-item"
                key={`${row}-${index}`}
            >

                <div className="cosmos-statistics-tags-editor-header">

                    <strong>
                        Cifra {index + 1}
                    </strong>

                    <Button
                        isDestructive
                        variant="link"
                        onClick={() =>
                            removeItem(
                                row,
                                index
                            )
                        }
                    >
                        Eliminar
                    </Button>

                </div>


                <TextControl
                    label="Número"
                    type="number"
                    value={item.number}
                    onChange={(value) =>
                        updateItem(
                            row,
                            index,
                            'number',
                            value
                        )
                    }
                />


                <TextControl
                    label="Signo antes"
                    placeholder="Ej: +"
                    value={item.prefix}
                    onChange={(value) =>
                        updateItem(
                            row,
                            index,
                            'prefix',
                            value
                        )
                    }
                />


                <TextControl
                    label="Signo después"
                    placeholder="Ej: %"
                    value={item.suffix}
                    onChange={(value) =>
                        updateItem(
                            row,
                            index,
                            'suffix',
                            value
                        )
                    }
                />


                <TextControl
                    label="Texto"
                    value={item.text}
                    onChange={(value) =>
                        updateItem(
                            row,
                            index,
                            'text',
                            value
                        )
                    }
                    placeholder="Texto..."
                />


                <TextControl
                    label="Texto del tag"
                    value={item.tag}
                    onChange={(value) =>
                        updateItem(
                            row,
                            index,
                            'tag',
                            value
                        )
                    }
                    placeholder="Ej: Hoteles"
                />

            </div>
        );
    };


    return (

        <Fragment>

            <InspectorControls>

                {/* =================================================
                    ANCHO DEL BLOQUE
                ================================================= */}

                <PanelBody
                    title="Ancho del bloque"
                    initialOpen={true}
                >

                    <SelectControl
                        label="Ancho"
                        value={contentWidth || 'container'}
                        options={[
                            {
                                label: 'Container del sitio',
                                value: 'container'
                            },
                            {
                                label: 'Ancho completo (100%)',
                                value: 'full'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                contentWidth: value
                            })
                        }
                    />

                </PanelBody>


                {/* =================================================
                    FONDO DEL BLOQUE
                ================================================= */}

                <PanelBody
                    title="Fondo del bloque"
                    initialOpen={false}
                >

                    <p>
                        <strong>
                            Color de fondo
                        </strong>
                    </p>

                    <ColorPalette
                        value={backgroundColor}
                        onChange={(value) =>
                            setAttributes({
                                backgroundColor:
                                    value || 'transparent'
                            })
                        }
                    />

                </PanelBody>


                {/* =================================================
                    FILA 1
                ================================================= */}

                <PanelBody
                    title="Fila superior"
                    initialOpen={true}
                >

                    {row1.map(
                        (item, index) =>
                            renderEditorItem(
                                item,
                                index,
                                1
                            )
                    )}


                    {row1.length < 5 && (

                        <Button
                            variant="secondary"
                            onClick={() =>
                                addItem(1)
                            }
                            style={{
                                width: '100%',
                                justifyContent:
                                    'center',
                                marginTop: '10px'
                            }}
                        >
                            + Agregar cifra
                        </Button>

                    )}

                </PanelBody>


                {/* =================================================
                    FILA 2
                ================================================= */}

                <PanelBody
                    title="Fila inferior"
                    initialOpen={false}
                >

                    {row2.map(
                        (item, index) =>
                            renderEditorItem(
                                item,
                                index,
                                2
                            )
                    )}


                    {row2.length < 5 && (

                        <Button
                            variant="secondary"
                            onClick={() =>
                                addItem(2)
                            }
                            style={{
                                width: '100%',
                                justifyContent:
                                    'center',
                                marginTop: '10px'
                            }}
                        >
                            + Agregar cifra
                        </Button>

                    )}

                </PanelBody>


                {/* =================================================
                    NÚMEROS
                ================================================= */}

                <PanelBody
                    title="Número"
                    initialOpen={false}
                >

                    <p>
                        <strong>
                            Color
                        </strong>
                    </p>

                    <ColorPalette
                        value={numberColor}
                        onChange={(value) =>
                            setAttributes({
                                numberColor:
                                    value || '#111111'
                            })
                        }
                    />

                    <RangeControl
                        label="Tamaño"
                        value={numberSize}
                        onChange={(value) =>
                            setAttributes({
                                numberSize: value
                            })
                        }
                        min={20}
                        max={100}
                    />

                    <RangeControl
                        label="Grosor"
                        value={numberWeight}
                        onChange={(value) =>
                            setAttributes({
                                numberWeight: value
                            })
                        }
                        min={100}
                        max={900}
                        step={100}
                    />

                </PanelBody>


                {/* =================================================
                    TEXTO
                ================================================= */}

                <PanelBody
                    title="Texto"
                    initialOpen={false}
                >

                    <p>
                        <strong>
                            Color
                        </strong>
                    </p>

                    <ColorPalette
                        value={textColor}
                        onChange={(value) =>
                            setAttributes({
                                textColor:
                                    value || '#666666'
                            })
                        }
                    />

                    <RangeControl
                        label="Tamaño"
                        value={textSize}
                        onChange={(value) =>
                            setAttributes({
                                textSize: value
                            })
                        }
                        min={10}
                        max={40}
                    />

                    <RangeControl
                        label="Grosor"
                        value={textWeight}
                        onChange={(value) =>
                            setAttributes({
                                textWeight: value
                            })
                        }
                        min={100}
                        max={900}
                        step={100}
                    />

                </PanelBody>


                {/* =================================================
                    TAG
                ================================================= */}

                <PanelBody
                    title="Tag"
                    initialOpen={false}
                >

                    <p>
                        <strong>
                            Color de fondo
                        </strong>
                    </p>

                    <ColorPalette
                        value={tagBackground}
                        onChange={(value) =>
                            setAttributes({
                                tagBackground:
                                    value || '#111111'
                            })
                        }
                    />


                    <p>
                        <strong>
                            Color del texto
                        </strong>
                    </p>

                    <ColorPalette
                        value={tagTextColor}
                        onChange={(value) =>
                            setAttributes({
                                tagTextColor:
                                    value || '#ffffff'
                            })
                        }
                    />


                    <SelectControl
                        label="Alineación"
                        value={tagAlignment}
                        options={[
                            {
                                label: 'Izquierda',
                                value: 'left'
                            },
                            {
                                label: 'Centrada',
                                value: 'center'
                            },
                            {
                                label: 'Derecha',
                                value: 'right'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                tagAlignment: value
                            })
                        }
                    />


                    <RangeControl
                        label="Border radius"
                        value={tagBorderRadius}
                        onChange={(value) =>
                            setAttributes({
                                tagBorderRadius: value
                            })
                        }
                        min={0}
                        max={100}
                        step={1}
                    />


                    <RangeControl
                        label="Padding vertical"
                        value={tagPaddingVertical}
                        onChange={(value) =>
                            setAttributes({
                                tagPaddingVertical:
                                    value
                            })
                        }
                        min={0}
                        max={30}
                        step={1}
                    />


                    <RangeControl
                        label="Padding horizontal"
                        value={tagPaddingHorizontal}
                        onChange={(value) =>
                            setAttributes({
                                tagPaddingHorizontal:
                                    value
                            })
                        }
                        min={0}
                        max={50}
                        step={1}
                    />


                    <RangeControl
                        label="Tamaño del texto"
                        value={tagFontSize}
                        onChange={(value) =>
                            setAttributes({
                                tagFontSize: value
                            })
                        }
                        min={8}
                        max={30}
                        step={1}
                    />


                    <RangeControl
                        label="Grosor del texto"
                        value={tagWeight}
                        onChange={(value) =>
                            setAttributes({
                                tagWeight: value
                            })
                        }
                        min={100}
                        max={900}
                        step={100}
                    />

                </PanelBody>


                {/* =================================================
                    LÍNEAS
                ================================================= */}

                <PanelBody
                    title="Líneas divisorias"
                    initialOpen={false}
                >

                    <p>
                        <strong>
                            Color
                        </strong>
                    </p>

                    <ColorPalette
                        value={lineColor}
                        onChange={(value) =>
                            setAttributes({
                                lineColor:
                                    value || '#dddddd'
                            })
                        }
                    />

                    <RangeControl
                        label="Grosor"
                        value={lineWidth}
                        onChange={(value) =>
                            setAttributes({
                                lineWidth: value
                            })
                        }
                        min={1}
                        max={5}
                    />

                </PanelBody>


                {/* =================================================
                    ANIMACIÓN
                ================================================= */}

                <PanelBody
                    title="Animación"
                    initialOpen={false}
                >

                    <RangeControl
                        label="Duración"
                        value={animationDuration}
                        onChange={(value) =>
                            setAttributes({
                                animationDuration:
                                    value
                            })
                        }
                        min={500}
                        max={5000}
                        step={100}
                    />

                    <RangeControl
                        label="Decimales"
                        value={animationDecimals}
                        onChange={(value) =>
                            setAttributes({
                                animationDecimals:
                                    value
                            })
                        }
                        min={0}
                        max={3}
                    />

                </PanelBody>


                {/* =================================================
                    ESPACIADO
                ================================================= */}

                <PanelBody
                    title="Espaciado"
                    initialOpen={false}
                >

                    <RangeControl
                        label="Separación horizontal"
                        value={columnGap}
                        onChange={(value) =>
                            setAttributes({
                                columnGap: value
                            })
                        }
                        min={0}
                        max={50}
                    />

                    <RangeControl
                        label="Separación vertical"
                        value={rowGap}
                        onChange={(value) =>
                            setAttributes({
                                rowGap: value
                            })
                        }
                        min={0}
                        max={50}
                    />

                    <RangeControl
                        label="Espacio superior"
                        value={sectionPaddingTop}
                        onChange={(value) =>
                            setAttributes({
                                sectionPaddingTop:
                                    value
                            })
                        }
                        min={0}
                        max={100}
                    />

                    <RangeControl
                        label="Espacio inferior"
                        value={sectionPaddingBottom}
                        onChange={(value) =>
                            setAttributes({
                                sectionPaddingBottom:
                                    value
                            })
                        }
                        min={0}
                        max={100}
                    />

                </PanelBody>

            </InspectorControls>


            {/* =====================================================
                VISTA DEL EDITOR
            ===================================================== */}

            <div {...blockProps}>

                <div className="cosmos-statistics-grid-tags__rows">

                    {/* FILA 1 */}

                    {row1.length > 0 && (

                        <div
                            className="
                                cosmos-statistics-grid-tags__row
                                cosmos-statistics-grid-tags__row--top
                            "
                        >

                            {row1.map(
                                (item, index) => (

                                    <div
                                        className="cosmos-statistics-grid-tags__item"
                                        key={index}
                                    >

                                        <div
                                            className="cosmos-statistics-grid-tags__number"
                                        >

                                            {item.prefix}

                                            {item.number}

                                            {item.suffix}

                                        </div>


                                        <RichText
                                            tagName="div"
                                            className="cosmos-statistics-grid-tags__text"
                                            value={item.text}
                                            onChange={(value) =>
                                                updateItem(
                                                    1,
                                                    index,
                                                    'text',
                                                    value
                                                )
                                            }
                                            placeholder="Texto..."
                                            allowedFormats={[]}
                                        />


                                        {item.tag && (

                                            <div
                                                className={`
                                                    cosmos-statistics-grid-tags__tag
                                                    cosmos-statistics-grid-tags__tag--${tagAlignment}
                                                `}
                                                style={getTagAlignmentStyle()}
                                            >
                                                {item.tag}
                                            </div>

                                        )}

                                    </div>

                                )
                            )}

                        </div>

                    )}


                    {/* FILA 2 */}

                    {row2.length > 0 && (

                        <div
                            className="
                                cosmos-statistics-grid-tags__row
                                cosmos-statistics-grid-tags__row--bottom
                            "
                        >

                            {row2.map(
                                (item, index) => (

                                    <div
                                        className="cosmos-statistics-grid-tags__item"
                                        key={index}
                                    >

                                        <div
                                            className="cosmos-statistics-grid-tags__number"
                                        >

                                            {item.prefix}

                                            {item.number}

                                            {item.suffix}

                                        </div>


                                        <RichText
                                            tagName="div"
                                            className="cosmos-statistics-grid-tags__text"
                                            value={item.text}
                                            onChange={(value) =>
                                                updateItem(
                                                    2,
                                                    index,
                                                    'text',
                                                    value
                                                )
                                            }
                                            placeholder="Texto..."
                                            allowedFormats={[]}
                                        />


                                        {item.tag && (

                                            <div
                                                className={`
                                                    cosmos-statistics-grid-tags__tag
                                                    cosmos-statistics-grid-tags__tag--${tagAlignment}
                                                `}
                                                style={getTagAlignmentStyle()}
                                            >
                                                {item.tag}
                                            </div>

                                        )}

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>

        </Fragment>
    );
}


registerBlockType(
    metadata.name,
    {
        ...metadata,
        edit: Edit,
        save: () => null
    }
);