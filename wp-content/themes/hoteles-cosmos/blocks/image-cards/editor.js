
import { registerBlockType } from '@wordpress/blocks';

import {
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    useBlockProps,
    ColorPalette
} from '@wordpress/block-editor';

import {
    PanelBody,
    Button,
    RangeControl,
    SelectControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

/*
 * =====================================================
 * UTILIDADES
 * =====================================================
 */

const MIN_CARDS = 2;
const MAX_CARDS = 6;

const createCard = (index) => ({
    imageUrl: '',
    imageId: 0,
    imageAlt: '',
    title: `Título de la card ${index + 1}`,
    description: `Descripción de la card ${index + 1}.`
});

const normalizeCards = (cards) => {
    const normalized = Array.isArray(cards)
        ? cards.slice(0, MAX_CARDS).map((card, index) => ({
            ...createCard(index),
            ...(card || {})
        }))
        : [];

    while (normalized.length < MIN_CARDS) {
        normalized.push(createCard(normalized.length));
    }

    return normalized;
};

/*
 * =====================================================
 * REGISTRO DEL BLOQUE
 * =====================================================
 */

registerBlockType('hoteles-cosmos/image-cards', {
    edit: ({ attributes, setAttributes }) => {
        const {
            cards,
            cardHeight,
            cardGap,
            overlay,
            titleColor,
            titleSize,
            titleWeight,
            titleAlign,
            descriptionColor,
            descriptionSize,
            descriptionWeight,
            descriptionAlign,
            blockMarginTop,
            blockMarginBottom
        } = attributes;

        const safeCards = normalizeCards(cards);

        /*
         * Actualizar uno o varios campos de una tarjeta.
         */
        const updateCard = (index, property, value) => {
            const nextCards = [...safeCards];

            if (typeof property === 'object' && property !== null) {
                nextCards[index] = {
                    ...nextCards[index],
                    ...property
                };
            } else {
                nextCards[index] = {
                    ...nextCards[index],
                    [property]: value
                };
            }

            setAttributes({ cards: nextCards });
        };

        /*
         * Añadir tarjeta, hasta un máximo de 6.
         */
        const addCard = () => {
            if (safeCards.length >= MAX_CARDS) {
                return;
            }

            setAttributes({
                cards: [
                    ...safeCards,
                    createCard(safeCards.length)
                ]
            });
        };

        /*
         * Eliminar tarjeta, manteniendo un mínimo de 2.
         */
        const removeCard = (index) => {
            if (safeCards.length <= MIN_CARDS) {
                return;
            }

            setAttributes({
                cards: safeCards.filter((_, cardIndex) => cardIndex !== index)
            });
        };

        /*
         * =====================================================
         * VARIABLES CSS
         * =====================================================
         */

        const blockProps = useBlockProps({
            className: 'cosmos-image-cards',
            style: {
                '--cosmos-card-columns': safeCards.length,
                '--cosmos-card-height': `${cardHeight}px`,
                '--cosmos-card-gap': `${cardGap}px`,
                '--cosmos-card-overlay': overlay / 100,

                '--cosmos-card-title-color': titleColor,
                '--cosmos-card-title-size': `${titleSize}px`,
                '--cosmos-card-title-weight': titleWeight,
                '--cosmos-card-title-align': titleAlign,

                '--cosmos-card-description-color': descriptionColor,
                '--cosmos-card-description-size': `${descriptionSize}px`,
                '--cosmos-card-description-weight': descriptionWeight,
                '--cosmos-card-description-align': descriptionAlign,

                '--cosmos-block-margin-top': `${blockMarginTop}px`,
                '--cosmos-block-margin-bottom': `${blockMarginBottom}px`
            }
        });

        return (
            <Fragment>
                <InspectorControls>
                    {/* ADMINISTRAR TARJETAS */}

                    <PanelBody
                        title={`Administrar tarjetas (${safeCards.length}/${MAX_CARDS})`}
                        initialOpen={true}
                    >
                        <p>
                            Puedes tener entre {MIN_CARDS} y {MAX_CARDS} tarjetas.
                            Las columnas se ajustan automáticamente al número de tarjetas.
                        </p>

                        <Button
                            variant="primary"
                            onClick={addCard}
                            disabled={safeCards.length >= MAX_CARDS}
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                marginBottom: '12px'
                            }}
                        >
                            Añadir tarjeta
                        </Button>

                        {safeCards.length >= MAX_CARDS && (
                            <p>
                                Has alcanzado el máximo de {MAX_CARDS} tarjetas.
                            </p>
                        )}
                    </PanelBody>

                    {/* CONFIGURACIÓN INDIVIDUAL DE CADA TARJETA */}

                    {safeCards.map((card, index) => (
                        <PanelBody
                            key={`card-panel-${index}`}
                            title={`Card ${index + 1}`}
                            initialOpen={false}
                        >
                            <MediaUploadCheck>
                                <MediaUpload
                                    allowedTypes={['image']}
                                    value={card.imageId || 0}
                                    onSelect={(media) => {
                                        updateCard(index, {
                                            imageUrl: media.url || '',
                                            imageId: media.id || 0,
                                            imageAlt: media.alt || ''
                                        });
                                    }}
                                    render={({ open }) => (
                                        <Button
                                            variant="secondary"
                                            onClick={open}
                                            style={{
                                                width: '100%',
                                                justifyContent: 'center',
                                                marginBottom: '12px'
                                            }}
                                        >
                                            {card.imageUrl
                                                ? 'Cambiar imagen'
                                                : 'Seleccionar imagen'}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>

                            {card.imageUrl && (
                                <div style={{ marginBottom: '12px' }}>
                                    <img
                                        src={card.imageUrl}
                                        alt={card.imageAlt || ''}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </div>
                            )}

                            <p>
                                Edita el título y la descripción directamente
                                sobre la tarjeta.
                            </p>

                            <Button
                                variant="secondary"
                                isDestructive
                                onClick={() => removeCard(index)}
                                disabled={safeCards.length <= MIN_CARDS}
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    marginTop: '8px'
                                }}
                            >
                                Eliminar tarjeta
                            </Button>

                            {safeCards.length <= MIN_CARDS && (
                                <p>
                                    Debes conservar al menos {MIN_CARDS} tarjetas.
                                </p>
                            )}
                        </PanelBody>
                    ))}

                    {/* DISEÑO */}

                    <PanelBody
                        title="Diseño"
                        initialOpen={true}
                    >
                        <RangeControl
                            label="Altura de las cards"
                            value={cardHeight}
                            onChange={(value) => setAttributes({
                                cardHeight: value
                            })}
                            min={350}
                            max={800}
                            step={10}
                        />

                        <RangeControl
                            label="Separación"
                            value={cardGap}
                            onChange={(value) => setAttributes({
                                cardGap: value
                            })}
                            min={0}
                            max={60}
                        />

                        <RangeControl
                            label="Oscurecimiento de imagen"
                            value={overlay}
                            onChange={(value) => setAttributes({
                                overlay: value
                            })}
                            min={0}
                            max={90}
                            step={5}
                        />
                    </PanelBody>

                    {/* TÍTULO */}

                    <PanelBody
                        title="Título"
                        initialOpen={false}
                    >
                        <RangeControl
                            label="Tamaño"
                            value={titleSize}
                            onChange={(value) => setAttributes({
                                titleSize: value
                            })}
                            min={16}
                            max={60}
                        />

                        <SelectControl
                            label="Peso"
                            value={titleWeight}
                            options={[
                                { label: 'Regular', value: '400' },
                                { label: 'Medio', value: '500' },
                                { label: 'Seminegrita', value: '600' },
                                { label: 'Negrita', value: '700' }
                            ]}
                            onChange={(value) => setAttributes({
                                titleWeight: value
                            })}
                        />

                        <SelectControl
                            label="Alineación"
                            value={titleAlign}
                            options={[
                                { label: 'Izquierda', value: 'left' },
                                { label: 'Centro', value: 'center' },
                                { label: 'Derecha', value: 'right' },
                                { label: 'Justificado', value: 'justify' }
                            ]}
                            onChange={(value) => setAttributes({
                                titleAlign: value
                            })}
                        />

                        <p>Color del título</p>

                        <ColorPalette
                            value={titleColor}
                            onChange={(value) => setAttributes({
                                titleColor: value || '#ffffff'
                            })}
                        />
                    </PanelBody>

                    {/* DESCRIPCIÓN */}

                    <PanelBody
                        title="Descripción"
                        initialOpen={false}
                    >
                        <RangeControl
                            label="Tamaño"
                            value={descriptionSize}
                            onChange={(value) => setAttributes({
                                descriptionSize: value
                            })}
                            min={12}
                            max={36}
                        />

                        <SelectControl
                            label="Peso"
                            value={descriptionWeight}
                            options={[
                                { label: 'Regular', value: '400' },
                                { label: 'Medio', value: '500' },
                                { label: 'Seminegrita', value: '600' },
                                { label: 'Negrita', value: '700' }
                            ]}
                            onChange={(value) => setAttributes({
                                descriptionWeight: value
                            })}
                        />

                        <SelectControl
                            label="Alineación"
                            value={descriptionAlign}
                            options={[
                                { label: 'Izquierda', value: 'left' },
                                { label: 'Centro', value: 'center' },
                                { label: 'Derecha', value: 'right' },
                                { label: 'Justificado', value: 'justify' }
                            ]}
                            onChange={(value) => setAttributes({
                                descriptionAlign: value
                            })}
                        />

                        <p>Color de la descripción</p>

                        <ColorPalette
                            value={descriptionColor}
                            onChange={(value) => setAttributes({
                                descriptionColor: value || '#ffffff'
                            })}
                        />
                    </PanelBody>

                    {/* MÁRGENES */}

                    <PanelBody
                        title="Margen del bloque"
                        initialOpen={false}
                    >
                        <RangeControl
                            label="Margen superior"
                            value={blockMarginTop}
                            onChange={(value) => setAttributes({
                                blockMarginTop: value
                            })}
                            min={0}
                            max={200}
                        />

                        <RangeControl
                            label="Margen inferior"
                            value={blockMarginBottom}
                            onChange={(value) => setAttributes({
                                blockMarginBottom: value
                            })}
                            min={0}
                            max={200}
                        />
                    </PanelBody>
                </InspectorControls>

                {/* VISTA DEL BLOQUE EN EL EDITOR */}

                <section {...blockProps}>
                    <div className="container">
                        <div className="cosmos-image-cards__grid">
                            {safeCards.map((card, index) => {
                                const backgroundImage = card.imageUrl
                                    ? `linear-gradient(
                                        rgba(0, 0, 0, ${overlay / 100}),
                                        rgba(0, 0, 0, ${overlay / 100})
                                    ), url("${card.imageUrl}")`
                                    : undefined;

                                return (
                                    <article
                                        key={`card-${index}`}
                                        className="cosmos-image-cards__card"
                                        style={{ backgroundImage }}
                                    >
                                        <div className="cosmos-image-cards__content">
                                            <div className="cosmos-image-cards__title-area">
                                                <RichText
                                                    tagName="h3"
                                                    className="cosmos-image-cards__title"
                                                    value={card.title || ''}
                                                    onChange={(value) => updateCard(
                                                        index,
                                                        'title',
                                                        value
                                                    )}
                                                    placeholder="Título..."
                                                    allowedFormats={[
                                                        'core/bold',
                                                        'core/italic',
                                                        'core/link'
                                                    ]}
                                                />
                                            </div>

                                            <div className="cosmos-image-cards__description-area">
                                                <RichText
                                                    tagName="div"
                                                    className="cosmos-image-cards__description"
                                                    value={card.description || ''}
                                                    onChange={(value) => updateCard(
                                                        index,
                                                        'description',
                                                        value
                                                    )}
                                                    placeholder="Descripción..."
                                                    allowedFormats={[
                                                        'core/bold',
                                                        'core/italic',
                                                        'core/link'
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    },

    save: () => null
});
