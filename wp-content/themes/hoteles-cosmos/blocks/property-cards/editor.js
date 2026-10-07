import metadata from './block.json';

import {
    registerBlockType
} from '@wordpress/blocks';

import {
    useBlockProps,
    InspectorControls,
    ColorPalette,
    MediaUpload,
    MediaUploadCheck
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

    /*
     * =====================================================
     * ATRIBUTOS
     * =====================================================
     */

    const {
        contentWidth = 'container',

        overlayTextColor = '#ffffff',
        overlayTextSize = 24,
        overlayTextWeight = 700,

        barBackgroundColor = '#111111',

        areaLabelColor = '#ffffff',
        areaLabelSize = 20,
        areaLabelWeight = 700,

        iconSize = 28,
        iconGap = 12,

        valueColor = '#111111',
        valueSize = 16,
        valueWeight = 500,

        imageAspectRatio = '4/3',
        imageBarGap = 10,
        cardGap = 30,
        valueGap = 10
    } = attributes;


    /*
     * =====================================================
     * CARDS
     * =====================================================
     */

    const cards = Array.isArray(attributes.cards)
        ? attributes.cards
        : [];


    /*
     * =====================================================
     * BLOCK PROPS
     * =====================================================
     */

    const blockProps = useBlockProps({

        className: [
            'cosmos-property-cards',
            `cosmos-property-cards--${contentWidth}`
        ].join(' '),

        style: {

            '--cosmos-property-overlay-color':
                overlayTextColor,

            '--cosmos-property-overlay-size':
                `${overlayTextSize}px`,

            '--cosmos-property-overlay-weight':
                overlayTextWeight,

            '--cosmos-property-bar-background':
                barBackgroundColor,

            '--cosmos-property-area-color':
                areaLabelColor,

            '--cosmos-property-area-size':
                `${areaLabelSize}px`,

            '--cosmos-property-area-weight':
                areaLabelWeight,

            '--cosmos-property-icon-size':
                `${iconSize}px`,

            '--cosmos-property-icon-gap':
                `${iconGap}px`,

            '--cosmos-property-value-color':
                valueColor,

            '--cosmos-property-value-size':
                `${valueSize}px`,

            '--cosmos-property-value-weight':
                valueWeight,

            '--cosmos-property-image-bar-gap':
                `${imageBarGap}px`,

            '--cosmos-property-card-gap':
                `${cardGap}px`,

            '--cosmos-property-value-gap':
                `${valueGap}px`
        }
    });


    /*
     * =====================================================
     * ACTUALIZAR CARD
     * =====================================================
     */

    const updateCard = (
        index,
        field,
        value
    ) => {

        const currentCards = [...cards];

        currentCards[index] = {
            ...currentCards[index],
            [field]: value
        };

        setAttributes({
            cards: currentCards
        });
    };


    /*
     * =====================================================
     * ACTUALIZAR IMAGEN CARD
     * =====================================================
     */

    const updateCardImage = (
        index,
        media
    ) => {

        const currentCards = [...cards];

        currentCards[index] = {

            ...currentCards[index],

            imageId:
                media?.id || 0,

            imageUrl:
                media?.url || '',

            imageAlt:
                media?.alt ||
                media?.title ||
                ''
        };

        setAttributes({
            cards: currentCards
        });
    };


    /*
     * =====================================================
     * AGREGAR CARD
     * =====================================================
     */

    const addCard = () => {

        const currentCards = [
            ...cards
        ];

        currentCards.push({

            imageId: 0,

            imageUrl: '',

            imageAlt: '',

            title: '',

            areaValue: '',

            features: []

        });

        setAttributes({
            cards: currentCards
        });
    };


    /*
     * =====================================================
     * ELIMINAR CARD
     * =====================================================
     */

    const removeCard = (
        index
    ) => {

        const currentCards = [
            ...cards
        ];

        currentCards.splice(
            index,
            1
        );

        setAttributes({
            cards: currentCards
        });
    };


    /*
     * =====================================================
     * AGREGAR FEATURE
     * =====================================================
     */

    const addFeature = (
        cardIndex
    ) => {

        const currentCards = [
            ...cards
        ];

        const currentFeatures =
            Array.isArray(
                currentCards[
                    cardIndex
                ]?.features
            )
                ? [
                    ...currentCards[
                        cardIndex
                    ].features
                ]
                : [];


        currentFeatures.push({

            iconId: 0,

            iconUrl: '',

            iconAlt: '',

            value: ''

        });


        currentCards[
            cardIndex
        ] = {

            ...currentCards[
                cardIndex
            ],

            features:
                currentFeatures

        };


        setAttributes({
            cards: currentCards
        });
    };


    /*
     * =====================================================
     * ACTUALIZAR FEATURE
     * =====================================================
     */

    const updateFeature = (
        cardIndex,
        featureIndex,
        field,
        value
    ) => {

        const currentCards = [
            ...cards
        ];

        const currentFeatures =
            Array.isArray(
                currentCards[
                    cardIndex
                ]?.features
            )
                ? [
                    ...currentCards[
                        cardIndex
                    ].features
                ]
                : [];


        currentFeatures[
            featureIndex
        ] = {

            ...currentFeatures[
                featureIndex
            ],

            [field]:
                value

        };


        currentCards[
            cardIndex
        ] = {

            ...currentCards[
                cardIndex
            ],

            features:
                currentFeatures

        };


        setAttributes({
            cards: currentCards
        });
    };


    /*
     * =====================================================
     * ACTUALIZAR IMAGEN FEATURE
     * =====================================================
     */

    const updateFeatureImage = (
        cardIndex,
        featureIndex,
        media
    ) => {

        const currentCards = [
            ...cards
        ];

        const currentFeatures =
            Array.isArray(
                currentCards[
                    cardIndex
                ]?.features
            )
                ? [
                    ...currentCards[
                        cardIndex
                    ].features
                ]
                : [];


        currentFeatures[
            featureIndex
        ] = {

            ...currentFeatures[
                featureIndex
            ],

            iconId:
                media?.id || 0,

            iconUrl:
                media?.url || '',

            iconAlt:
                media?.alt ||
                media?.title ||
                ''

        };


        currentCards[
            cardIndex
        ] = {

            ...currentCards[
                cardIndex
            ],

            features:
                currentFeatures

        };


        setAttributes({
            cards: currentCards
        });
    };


    /*
     * =====================================================
     * ELIMINAR FEATURE
     * =====================================================
     */

    const removeFeature = (
        cardIndex,
        featureIndex
    ) => {

        const currentCards = [
            ...cards
        ];

        const currentFeatures =
            Array.isArray(
                currentCards[
                    cardIndex
                ]?.features
            )
                ? [
                    ...currentCards[
                        cardIndex
                    ].features
                ]
                : [];


        currentFeatures.splice(
            featureIndex,
            1
        );


        currentCards[
            cardIndex
        ] = {

            ...currentCards[
                cardIndex
            ],

            features:
                currentFeatures

        };


        setAttributes({
            cards: currentCards
        });
    };


    /*
     * =====================================================
     * RENDER CARD
     * =====================================================
     */

    const renderCard = (
        card,
        index
    ) => {

        const features =
            Array.isArray(card.features)
                ? card.features
                : [];


        /*
         * La primera columna es M².
         *
         * Las siguientes columnas son exactamente
         * las columnas de cada icono.
         *
         * Ejemplo con 3 iconos:
         *
         * 1fr | max-content | max-content | max-content
         *
         * Esto permite que icono y valor compartan
         * exactamente la misma columna.
         */

        const specsColumns =
            `1fr repeat(${features.length}, max-content)`;


        return (

            <div
                className="
                    cosmos-property-cards__card
                "
                key={index}
            >

                {/* =================================================
                    IMAGEN
                ================================================= */}

                <div
                    className="
                        cosmos-property-cards__image-wrapper
                    "
                    style={{
                        aspectRatio:
                            imageAspectRatio
                    }}
                >

                    {card.imageUrl ? (

                        <>

                            <img
                                src={
                                    card.imageUrl
                                }
                                alt={
                                    card.imageAlt ||
                                    ''
                                }
                                className="
                                    cosmos-property-cards__image
                                "
                            />

                            <div
                                className="
                                    cosmos-property-cards__overlay-gradient
                                "
                            />

                            {card.title && (

                                <div
                                    className="
                                        cosmos-property-cards__overlay-title
                                    "
                                >
                                    {card.title}
                                </div>

                            )}

                        </>

                    ) : (

                        <div
                            className="
                                cosmos-property-cards__image-placeholder
                            "
                        >

                            <MediaUploadCheck>

                                <MediaUpload

                                    onSelect={(
                                        media
                                    ) =>
                                        updateCardImage(
                                            index,
                                            media
                                        )
                                    }

                                    allowedTypes={[
                                        'image'
                                    ]}

                                    value={
                                        card.imageId
                                    }

                                    render={({
                                        open
                                    }) => (

                                        <Button
                                            variant="secondary"
                                            onClick={open}
                                        >
                                            Seleccionar imagen
                                        </Button>

                                    )}

                                />

                            </MediaUploadCheck>

                        </div>

                    )}

                </div>


                {/* =================================================
                    ESPECIFICACIONES
                ================================================= */}

                <div
                    className="
                        cosmos-property-cards__specs
                    "
                    style={{
                        gridTemplateColumns:
                            specsColumns
                    }}
                >

                    {/* =================================================
                        M²
                    ================================================= */}

                    <div
                        className="
                            cosmos-property-cards__spec-area
                        "
                    >

                        <div
                            className="
                                cosmos-property-cards__spec-icon
                                cosmos-property-cards__spec-icon--area
                            "
                        >

                            M<sup>2</sup>

                        </div>


                        <div
                            className="
                                cosmos-property-cards__spec-value
                                cosmos-property-cards__spec-value--area
                            "
                        >

                            {
                                card.areaValue ||
                                '0'
                            }

                        </div>

                    </div>


                    {/* =================================================
                        ICONOS + VALORES
                    ================================================= */}

                    {features.map(
                        (
                            feature,
                            featureIndex
                        ) => (

                            <div
                                className="
                                    cosmos-property-cards__spec-feature
                                "
                                key={
                                    featureIndex
                                }
                            >

                                <div
                                    className="
                                        cosmos-property-cards__spec-icon
                                    "
                                >

                                    {feature.iconUrl && (

                                        <img
                                            src={
                                                feature.iconUrl
                                            }
                                            alt={
                                                feature.iconAlt ||
                                                ''
                                            }
                                            className="
                                                cosmos-property-cards__icon
                                            "
                                        />

                                    )}

                                </div>


                                <div
                                    className="
                                        cosmos-property-cards__spec-value
                                    "
                                >

                                    {
                                        feature.value ||
                                        '0'
                                    }

                                </div>

                            </div>

                        )
                    )}

                </div>

            </div>

        );
    };


    /*
     * =====================================================
     * RETURN
     * =====================================================
     */

    return (

        <Fragment>

            <InspectorControls>

                {/* =================================================
                    ANCHO
                ================================================= */}

                <PanelBody
                    title="Ancho del bloque"
                    initialOpen={true}
                >

                    <SelectControl
                        label="Ancho"
                        value={
                            contentWidth
                        }
                        options={[
                            {
                                label:
                                    'Container del sitio',
                                value:
                                    'container'
                            },
                            {
                                label:
                                    'Ancho completo (100%)',
                                value:
                                    'full'
                            }
                        ]}
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                contentWidth:
                                    value
                            })
                        }
                    />

                </PanelBody>


                {/* =================================================
                    CARDS
                ================================================= */}

                <PanelBody
                    title="Cards"
                    initialOpen={true}
                >

                    {cards.map(
                        (
                            card,
                            index
                        ) => {

                            const features =
                                Array.isArray(
                                    card.features
                                )
                                    ? card.features
                                    : [];


                            return (

                                <div
                                    className="
                                        cosmos-property-editor-card
                                    "
                                    key={
                                        index
                                    }
                                >

                                    <div
                                        className="
                                            cosmos-property-editor-card__header
                                        "
                                    >

                                        <strong>
                                            Card {index + 1}
                                        </strong>

                                        <Button
                                            isDestructive
                                            variant="link"
                                            onClick={() =>
                                                removeCard(
                                                    index
                                                )
                                            }
                                        >
                                            Eliminar
                                        </Button>

                                    </div>


                                    <MediaUploadCheck>

                                        <MediaUpload

                                            onSelect={(
                                                media
                                            ) =>
                                                updateCardImage(
                                                    index,
                                                    media
                                                )
                                            }

                                            allowedTypes={[
                                                'image'
                                            ]}

                                            value={
                                                card.imageId
                                            }

                                            render={({
                                                open
                                            }) => (

                                                <Button
                                                    variant="secondary"
                                                    onClick={
                                                        open
                                                    }
                                                    style={{
                                                        width:
                                                            '100%',
                                                        justifyContent:
                                                            'center',
                                                        marginBottom:
                                                            '10px'
                                                    }}
                                                >

                                                    {card.imageUrl
                                                        ? 'Cambiar imagen'
                                                        : 'Seleccionar imagen'
                                                    }

                                                </Button>

                                            )}

                                        />

                                    </MediaUploadCheck>


                                    {card.imageUrl && (

                                        <img
                                            src={
                                                card.imageUrl
                                            }
                                            alt=""
                                            style={{
                                                width:
                                                    '100%',
                                                display:
                                                    'block',
                                                marginBottom:
                                                    '12px'
                                            }}
                                        />

                                    )}


                                    <TextControl
                                        label="Texto sobre la imagen"
                                        value={
                                            card.title ||
                                            ''
                                        }
                                        onChange={(
                                            value
                                        ) =>
                                            updateCard(
                                                index,
                                                'title',
                                                value
                                            )
                                        }
                                        placeholder="Ej: Suite Premium"
                                    />


                                    <TextControl
                                        label="Valor de M²"
                                        value={
                                            card.areaValue ||
                                            ''
                                        }
                                        onChange={(
                                            value
                                        ) =>
                                            updateCard(
                                                index,
                                                'areaValue',
                                                value
                                            )
                                        }
                                        placeholder="Ej: 120"
                                    />


                                    <div
                                        className="
                                            cosmos-property-editor-features
                                        "
                                    >

                                        <strong>
                                            Iconos y valores
                                        </strong>


                                        {features.map(
                                            (
                                                feature,
                                                featureIndex
                                            ) => (

                                                <div
                                                    className="
                                                        cosmos-property-editor-feature
                                                    "
                                                    key={
                                                        featureIndex
                                                    }
                                                >

                                                    <div
                                                        className="
                                                            cosmos-property-editor-feature__header
                                                        "
                                                    >

                                                        <strong>
                                                            Icono {
                                                                featureIndex +
                                                                1
                                                            }
                                                        </strong>

                                                        <Button
                                                            isDestructive
                                                            variant="link"
                                                            onClick={() =>
                                                                removeFeature(
                                                                    index,
                                                                    featureIndex
                                                                )
                                                            }
                                                        >
                                                            Eliminar
                                                        </Button>

                                                    </div>


                                                    <MediaUploadCheck>

                                                        <MediaUpload

                                                            onSelect={(
                                                                media
                                                            ) =>
                                                                updateFeatureImage(
                                                                    index,
                                                                    featureIndex,
                                                                    media
                                                                )
                                                            }

                                                            allowedTypes={[
                                                                'image'
                                                            ]}

                                                            value={
                                                                feature.iconId
                                                            }

                                                            render={({
                                                                open
                                                            }) => (

                                                                <Button
                                                                    variant="secondary"
                                                                    onClick={
                                                                        open
                                                                    }
                                                                    style={{
                                                                        width:
                                                                            '100%',
                                                                        justifyContent:
                                                                            'center'
                                                                    }}
                                                                >

                                                                    {feature.iconUrl
                                                                        ? 'Cambiar icono'
                                                                        : 'Seleccionar icono'
                                                                    }

                                                                </Button>

                                                            )}

                                                        />

                                                    </MediaUploadCheck>


                                                    {feature.iconUrl && (

                                                        <img
                                                            src={
                                                                feature.iconUrl
                                                            }
                                                            alt=""
                                                            className="
                                                                cosmos-property-editor-feature__preview
                                                            "
                                                        />

                                                    )}


                                                    <TextControl
                                                        label="Valor"
                                                        value={
                                                            feature.value ||
                                                            ''
                                                        }
                                                        onChange={(
                                                            value
                                                        ) =>
                                                            updateFeature(
                                                                index,
                                                                featureIndex,
                                                                'value',
                                                                value
                                                            )
                                                        }
                                                        placeholder="Ej: 4"
                                                    />

                                                </div>

                                            )
                                        )}


                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                addFeature(
                                                    index
                                                )
                                            }
                                            style={{
                                                width:
                                                    '100%',
                                                justifyContent:
                                                    'center',
                                                marginTop:
                                                    '10px'
                                            }}
                                        >
                                            + Agregar icono
                                        </Button>

                                    </div>

                                </div>

                            );

                        }
                    )}


                    <Button
                        variant="primary"
                        onClick={
                            addCard
                        }
                        style={{
                            width:
                                '100%',
                            justifyContent:
                                'center',
                            marginTop:
                                '10px'
                        }}
                    >
                        + Agregar card
                    </Button>

                </PanelBody>


                {/* =================================================
                    TEXTO SOBRE IMAGEN
                ================================================= */}

                <PanelBody
                    title="Texto sobre imagen"
                    initialOpen={false}
                >

                    <p>
                        <strong>
                            Color
                        </strong>
                    </p>

                    <ColorPalette
                        value={
                            overlayTextColor
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                overlayTextColor:
                                    value ||
                                    '#ffffff'
                            })
                        }
                    />


                    <RangeControl
                        label="Tamaño"
                        value={
                            overlayTextSize
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                overlayTextSize:
                                    value
                            })
                        }
                        min={10}
                        max={60}
                    />


                    <RangeControl
                        label="Grosor"
                        value={
                            overlayTextWeight
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                overlayTextWeight:
                                    value
                            })
                        }
                        min={100}
                        max={900}
                        step={100}
                    />

                </PanelBody>


                {/* =================================================
                    FRANJA
                ================================================= */}

                <PanelBody
                    title="Franja"
                    initialOpen={false}
                >

                    <p>
                        <strong>
                            Color de fondo
                        </strong>
                    </p>

                    <ColorPalette
                        value={
                            barBackgroundColor
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                barBackgroundColor:
                                    value ||
                                    '#111111'
                            })
                        }
                    />


                    <p>
                        <strong>
                            Color de M²
                        </strong>
                    </p>

                    <ColorPalette
                        value={
                            areaLabelColor
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                areaLabelColor:
                                    value ||
                                    '#ffffff'
                            })
                        }
                    />


                    <RangeControl
                        label="Tamaño de M²"
                        value={
                            areaLabelSize
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                areaLabelSize:
                                    value
                            })
                        }
                        min={10}
                        max={50}
                    />


                    <RangeControl
                        label="Grosor de M²"
                        value={
                            areaLabelWeight
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                areaLabelWeight:
                                    value
                            })
                        }
                        min={100}
                        max={900}
                        step={100}
                    />


                    <RangeControl
                        label="Tamaño de iconos"
                        value={
                            iconSize
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                iconSize:
                                    value
                            })
                        }
                        min={10}
                        max={60}
                    />


                    <RangeControl
                        label="Separación de iconos"
                        value={
                            iconGap
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                iconGap:
                                    value
                            })
                        }
                        min={0}
                        max={40}
                    />

                </PanelBody>


                {/* =================================================
                    VALORES
                ================================================= */}

                <PanelBody
                    title="Valores inferiores"
                    initialOpen={false}
                >

                    <p>
                        <strong>
                            Color
                        </strong>
                    </p>

                    <ColorPalette
                        value={
                            valueColor
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                valueColor:
                                    value ||
                                    '#111111'
                            })
                        }
                    />


                    <RangeControl
                        label="Tamaño"
                        value={
                            valueSize
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                valueSize:
                                    value
                            })
                        }
                        min={10}
                        max={40}
                    />


                    <RangeControl
                        label="Grosor"
                        value={
                            valueWeight
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                valueWeight:
                                    value
                            })
                        }
                        min={100}
                        max={900}
                        step={100}
                    />

                </PanelBody>


                {/* =================================================
                    IMÁGENES
                ================================================= */}

                <PanelBody
                    title="Imágenes"
                    initialOpen={false}
                >

                    <SelectControl
                        label="Proporción"
                        value={
                            imageAspectRatio
                        }
                        options={[
                            {
                                label: '4:3',
                                value: '4/3'
                            },
                            {
                                label: '16:9',
                                value: '16/9'
                            },
                            {
                                label: '3:2',
                                value: '3/2'
                            },
                            {
                                label: '1:1',
                                value: '1/1'
                            }
                        ]}
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                imageAspectRatio:
                                    value
                            })
                        }
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
                        label="Separación entre cards"
                        value={
                            cardGap
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                cardGap:
                                    value
                            })
                        }
                        min={0}
                        max={60}
                    />


                    <RangeControl
                        label="Separación imagen / franja"
                        value={
                            imageBarGap
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                imageBarGap:
                                    value
                            })
                        }
                        min={0}
                        max={40}
                    />


                    <RangeControl
                        label="Separación entre valores"
                        value={
                            valueGap
                        }
                        onChange={(
                            value
                        ) =>
                            setAttributes({
                                valueGap:
                                    value
                            })
                        }
                        min={0}
                        max={40}
                    />

                </PanelBody>

            </InspectorControls>


            {/* =====================================================
                BLOQUE
            ===================================================== */}

            <div {...blockProps}>

                {cards.length === 0 ? (

                    <div
                        className="
                            cosmos-property-cards__empty
                        "
                    >

                        <p>
                            No hay cards todavía.
                        </p>

                        <Button
                            variant="primary"
                            onClick={
                                addCard
                            }
                        >
                            + Agregar primera card
                        </Button>

                    </div>

                ) : (

                    <div
                        className="
                            cosmos-property-cards__grid
                        "
                    >

                        {cards.map(
                            (
                                card,
                                index
                            ) =>
                                renderCard(
                                    card,
                                    index
                                )
                        )}

                    </div>

                )}

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