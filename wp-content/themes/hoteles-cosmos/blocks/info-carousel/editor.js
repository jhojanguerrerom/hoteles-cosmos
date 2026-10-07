import metadata from './block.json';

import {
    registerBlockType
} from '@wordpress/blocks';

import {
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    ColorPalette
} from '@wordpress/block-editor';

import {
    PanelBody,
    Button,
    RangeControl,
    ToggleControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

import './style.css';
import './editor.css';


function Edit({ attributes, setAttributes }) {

    const {
        cards,

        contentWidth,

        cardBackground,
        cardHasBackground,
        cardBorderColor,
        cardBorderWidth,
        cardBorderRadius,
        cardPadding,

        iconSize,
        iconTitleGap,

        titleColor,
        titleFontSize,
        titleWeight,

        listColor,
        listFontSize,
        listWeight,
        listGap,

        cardGap,

        marginTop,
        marginBottom,

        showArrows,
        arrowColor,
        arrowBackground,
        arrowSize

    } = attributes;


    /*
     * =====================================================
     * ACTUALIZAR CARD
     * =====================================================
     */

    const updateCard = (index, data) => {

        const newCards = [...cards];

        newCards[index] = {
            ...newCards[index],
            ...data
        };

        setAttributes({
            cards: newCards
        });
    };


    /*
     * =====================================================
     * AÑADIR CARD
     * =====================================================
     */

    const addCard = () => {

        setAttributes({
            cards: [
                ...cards,
                {
                    id: Date.now(),
                    iconId: 0,
                    iconUrl: '',
                    iconAlt: '',
                    title: 'Nuevo título',
                    items: [
                        'Nuevo elemento'
                    ]
                }
            ]
        });
    };


    /*
     * =====================================================
     * ELIMINAR CARD
     * =====================================================
     */

    const removeCard = (index) => {

        if (cards.length <= 1) {
            return;
        }

        setAttributes({
            cards: cards.filter(
                (_, cardIndex) =>
                    cardIndex !== index
            )
        });
    };


    /*
     * =====================================================
     * ACTUALIZAR ITEM
     * =====================================================
     */

    const updateItem = (
        cardIndex,
        itemIndex,
        value
    ) => {

        const newCards = [...cards];

        const items =
            Array.isArray(
                newCards[cardIndex].items
            )
                ? [
                    ...newCards[cardIndex].items
                ]
                : [];

        items[itemIndex] = value;

        newCards[cardIndex] = {
            ...newCards[cardIndex],
            items
        };

        setAttributes({
            cards: newCards
        });
    };


    /*
     * =====================================================
     * AÑADIR ITEM
     * =====================================================
     */

    const addItem = (cardIndex) => {

        const newCards = [...cards];

        const items =
            Array.isArray(
                newCards[cardIndex].items
            )
                ? [
                    ...newCards[cardIndex].items
                ]
                : [];

        items.push(
            'Nuevo elemento'
        );

        newCards[cardIndex] = {
            ...newCards[cardIndex],
            items
        };

        setAttributes({
            cards: newCards
        });
    };


    /*
     * =====================================================
     * ELIMINAR ITEM
     * =====================================================
     */

    const removeItem = (
        cardIndex,
        itemIndex
    ) => {

        const newCards = [...cards];

        const items =
            Array.isArray(
                newCards[cardIndex].items
            )
                ? [
                    ...newCards[cardIndex].items
                ]
                : [];

        if (items.length <= 1) {
            return;
        }

        newCards[cardIndex] = {
            ...newCards[cardIndex],
            items: items.filter(
                (_, index) =>
                    index !== itemIndex
            )
        };

        setAttributes({
            cards: newCards
        });
    };


    /*
     * =====================================================
     * SELECCIONAR ICONO
     * =====================================================
     */

    const selectIcon = (
        index,
        media
    ) => {

        if (!media || !media.url) {
            return;
        }

        updateCard(
            index,
            {
                iconId: media.id || 0,
                iconUrl: media.url,
                iconAlt: media.alt || ''
            }
        );
    };


    /*
     * =====================================================
     * VARIABLES CSS
     * =====================================================
     */

    const blockProps = useBlockProps({
        className: `
            cosmos-info-carousel
            cosmos-info-carousel--${contentWidth}
        `,

        style: {

            '--cosmos-info-card-background':
                cardBackground,

            '--cosmos-info-card-border':
                cardBorderColor,

            '--cosmos-info-card-border-width':
                `${cardBorderWidth}px`,

            '--cosmos-info-card-radius':
                `${cardBorderRadius}px`,

            '--cosmos-info-card-padding':
                `${cardPadding}px`,

            '--cosmos-info-icon-size':
                `${iconSize}px`,

            '--cosmos-info-icon-title-gap':
                `${iconTitleGap}px`,

            '--cosmos-info-title-color':
                titleColor,

            '--cosmos-info-title-size':
                `${titleFontSize}px`,

            '--cosmos-info-title-weight':
                titleWeight,

            '--cosmos-info-list-color':
                listColor,

            '--cosmos-info-list-size':
                `${listFontSize}px`,

            '--cosmos-info-list-weight':
                listWeight,

            '--cosmos-info-list-gap':
                `${listGap}px`,

            '--cosmos-info-card-gap':
                `${cardGap}px`,

            '--cosmos-info-margin-top':
                `${marginTop}px`,

            '--cosmos-info-margin-bottom':
                `${marginBottom}px`,

            '--cosmos-info-arrow-color':
                arrowColor,

            '--cosmos-info-arrow-background':
                arrowBackground,

            '--cosmos-info-arrow-size':
                `${arrowSize}px`
        }
    });


    return (

        <Fragment>

            <InspectorControls>

                {/* =================================================
                    CARDS
                ================================================= */}

                <PanelBody
                    title="Cards"
                    initialOpen={true}
                >

                    <ToggleControl
                        label="Mostrar fondo"
                        checked={cardHasBackground}
                        onChange={(value) =>
                            setAttributes({
                                cardHasBackground:
                                    value
                            })
                        }
                    />


                    {cardHasBackground && (

                        <Fragment>

                            <p>
                                <strong>
                                    Fondo de las cards
                                </strong>
                            </p>

                            <ColorPalette
                                value={
                                    cardBackground
                                }
                                onChange={(value) =>
                                    setAttributes({
                                        cardBackground:
                                            value ||
                                            '#ffffff'
                                    })
                                }
                            />

                        </Fragment>

                    )}


                    <p>
                        <strong>
                            Color del borde
                        </strong>
                    </p>

                    <ColorPalette
                        value={cardBorderColor}
                        onChange={(value) =>
                            setAttributes({
                                cardBorderColor:
                                    value ||
                                    '#dddddd'
                            })
                        }
                    />


                    <RangeControl
                        label="Grosor del borde"
                        value={cardBorderWidth}
                        onChange={(value) =>
                            setAttributes({
                                cardBorderWidth:
                                    value
                            })
                        }
                        min={0}
                        max={10}
                        step={1}
                    />


                    <RangeControl
                        label="Border radius"
                        value={cardBorderRadius}
                        onChange={(value) =>
                            setAttributes({
                                cardBorderRadius:
                                    value
                            })
                        }
                        min={0}
                        max={60}
                        step={1}
                    />


                    <RangeControl
                        label="Padding interno"
                        value={cardPadding}
                        onChange={(value) =>
                            setAttributes({
                                cardPadding:
                                    value
                            })
                        }
                        min={10}
                        max={80}
                        step={1}
                    />

                </PanelBody>


                {/* =================================================
                    ICONO
                ================================================= */}

                <PanelBody
                    title="Icono"
                    initialOpen={false}
                >

                    <RangeControl
                        label="Tamaño del icono"
                        value={iconSize}
                        onChange={(value) =>
                            setAttributes({
                                iconSize:
                                    value
                            })
                        }
                        min={20}
                        max={100}
                        step={1}
                    />


                    <RangeControl
                        label="Separación icono / título"
                        value={iconTitleGap}
                        onChange={(value) =>
                            setAttributes({
                                iconTitleGap:
                                    value
                            })
                        }
                        min={0}
                        max={50}
                        step={1}
                    />

                </PanelBody>


                {/* =================================================
                    TÍTULO
                ================================================= */}

                <PanelBody
                    title="Título"
                    initialOpen={false}
                >

                    <p>
                        <strong>
                            Color
                        </strong>
                    </p>

                    <ColorPalette
                        value={titleColor}
                        onChange={(value) =>
                            setAttributes({
                                titleColor:
                                    value ||
                                    '#111111'
                            })
                        }
                    />


                    <RangeControl
                        label="Tamaño"
                        value={titleFontSize}
                        onChange={(value) =>
                            setAttributes({
                                titleFontSize:
                                    value
                            })
                        }
                        min={12}
                        max={60}
                        step={1}
                    />


                    <RangeControl
                        label="Peso"
                        value={titleWeight}
                        onChange={(value) =>
                            setAttributes({
                                titleWeight:
                                    value
                            })
                        }
                        min={300}
                        max={900}
                        step={100}
                    />

                </PanelBody>


                {/* =================================================
                    LISTA
                ================================================= */}

                <PanelBody
                    title="Lista"
                    initialOpen={false}
                >

                    <p>
                        <strong>
                            Color del texto
                        </strong>
                    </p>

                    <ColorPalette
                        value={listColor}
                        onChange={(value) =>
                            setAttributes({
                                listColor:
                                    value ||
                                    '#333333'
                            })
                        }
                    />


                    <RangeControl
                        label="Tamaño del texto"
                        value={listFontSize}
                        onChange={(value) =>
                            setAttributes({
                                listFontSize:
                                    value
                            })
                        }
                        min={10}
                        max={40}
                        step={1}
                    />


                    <RangeControl
                        label="Peso del texto"
                        value={listWeight}
                        onChange={(value) =>
                            setAttributes({
                                listWeight:
                                    value
                            })
                        }
                        min={300}
                        max={900}
                        step={100}
                    />


                    <RangeControl
                        label="Separación entre elementos"
                        value={listGap}
                        onChange={(value) =>
                            setAttributes({
                                listGap:
                                    value
                            })
                        }
                        min={0}
                        max={30}
                        step={1}
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
                        label="Margin superior"
                        value={marginTop}
                        onChange={(value) =>
                            setAttributes({
                                marginTop:
                                    value
                            })
                        }
                        min={0}
                        max={150}
                        step={1}
                    />


                    <RangeControl
                        label="Margin inferior"
                        value={marginBottom}
                        onChange={(value) =>
                            setAttributes({
                                marginBottom:
                                    value
                            })
                        }
                        min={0}
                        max={150}
                        step={1}
                    />


                    <RangeControl
                        label="Separación entre cards"
                        value={cardGap}
                        onChange={(value) =>
                            setAttributes({
                                cardGap:
                                    value
                            })
                        }
                        min={0}
                        max={80}
                        step={1}
                    />

                </PanelBody>


                {/* =================================================
                    FLECHAS
                ================================================= */}

                <PanelBody
                    title="Flechas"
                    initialOpen={false}
                >

                    <ToggleControl
                        label="Mostrar flechas"
                        checked={showArrows}
                        onChange={(value) =>
                            setAttributes({
                                showArrows:
                                    value
                            })
                        }
                    />


                    {showArrows && (

                        <Fragment>

                            <p>
                                <strong>
                                    Color
                                </strong>
                            </p>

                            <ColorPalette
                                value={arrowColor}
                                onChange={(value) =>
                                    setAttributes({
                                        arrowColor:
                                            value ||
                                            '#ffffff'
                                    })
                                }
                            />


                            <p>
                                <strong>
                                    Fondo
                                </strong>
                            </p>

                            <ColorPalette
                                value={arrowBackground}
                                onChange={(value) =>
                                    setAttributes({
                                        arrowBackground:
                                            value ||
                                            '#111111'
                                    })
                                }
                            />


                            <RangeControl
                                label="Tamaño"
                                value={arrowSize}
                                onChange={(value) =>
                                    setAttributes({
                                        arrowSize:
                                            value
                                    })
                                }
                                min={25}
                                max={80}
                                step={1}
                            />

                        </Fragment>

                    )}

                </PanelBody>

            </InspectorControls>


            {/* =====================================================
                EDITOR
            ===================================================== */}

            <div {...blockProps}>

                <div className="cosmos-info-carousel__viewport">

                    <div className="cosmos-info-carousel__track">

                        {cards.map(
                            (card, cardIndex) => {

                                const items =
                                    Array.isArray(
                                        card.items
                                    )
                                        ? card.items
                                        : [];

                                return (

                                    <article
                                        className="cosmos-info-carousel__card"
                                        key={
                                            card.id ||
                                            cardIndex
                                        }
                                    >

                                        {/* =================================================
                                            CABECERA
                                        ================================================= */}

                                        <div className="cosmos-info-carousel__header">

                                            <MediaUploadCheck>

                                                <MediaUpload
                                                    onSelect={(media) =>
                                                        selectIcon(
                                                            cardIndex,
                                                            media
                                                        )
                                                    }
                                                    allowedTypes={[
                                                        'image'
                                                    ]}
                                                    value={
                                                        card.iconId
                                                    }
                                                    render={({
                                                        open
                                                    }) => (

                                                        <button
                                                            type="button"
                                                            className="cosmos-info-carousel__icon-button"
                                                            onClick={
                                                                open
                                                            }
                                                        >

                                                            {card.iconUrl ? (

                                                                <img
                                                                    src={
                                                                        card.iconUrl
                                                                    }
                                                                    alt={
                                                                        card.iconAlt ||
                                                                        ''
                                                                    }
                                                                    className="cosmos-info-carousel__icon"
                                                                />

                                                            ) : (

                                                                <span>
                                                                    +
                                                                </span>

                                                            )}

                                                        </button>

                                                    )}
                                                />

                                            </MediaUploadCheck>


                                            <RichText
                                                tagName="h3"
                                                className="cosmos-info-carousel__title"
                                                value={
                                                    card.title
                                                }
                                                onChange={(value) =>
                                                    updateCard(
                                                        cardIndex,
                                                        {
                                                            title:
                                                                value
                                                        }
                                                    )
                                                }
                                                placeholder="Título..."
                                                allowedFormats={[]}
                                            />

                                        </div>


                                        {/* =================================================
                                            LISTA
                                        ================================================= */}

                                        <ul className="cosmos-info-carousel__list">

                                            {items.map(
                                                (
                                                    item,
                                                    itemIndex
                                                ) => (

                                                    <li
                                                        className="cosmos-info-carousel__list-item"
                                                        key={
                                                            itemIndex
                                                        }
                                                    >

                                                        <RichText
                                                            tagName="span"
                                                            value={
                                                                item
                                                            }
                                                            onChange={(
                                                                value
                                                            ) =>
                                                                updateItem(
                                                                    cardIndex,
                                                                    itemIndex,
                                                                    value
                                                                )
                                                            }
                                                            placeholder="Elemento..."
                                                            allowedFormats={[]}
                                                        />


                                                        <Button
                                                            isSmall
                                                            isDestructive
                                                            onClick={() =>
                                                                removeItem(
                                                                    cardIndex,
                                                                    itemIndex
                                                                )
                                                            }
                                                            disabled={
                                                                items.length <=
                                                                1
                                                            }
                                                        >
                                                            ×
                                                        </Button>

                                                    </li>

                                                )
                                            )}

                                        </ul>


                                        {/* =================================================
                                            CONTROLES
                                        ================================================= */}

                                        <div className="cosmos-info-carousel__card-controls">

                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    addItem(
                                                        cardIndex
                                                    )
                                                }
                                            >
                                                + Añadir elemento
                                            </Button>


                                            <Button
                                                isDestructive
                                                variant="secondary"
                                                onClick={() =>
                                                    removeCard(
                                                        cardIndex
                                                    )
                                                }
                                                disabled={
                                                    cards.length <=
                                                    1
                                                }
                                            >
                                                Eliminar card
                                            </Button>

                                        </div>

                                    </article>

                                );
                            }
                        )}

                    </div>

                </div>


                <div className="cosmos-info-carousel__add">

                    <Button
                        variant="primary"
                        onClick={addCard}
                    >
                        + Añadir card
                    </Button>

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