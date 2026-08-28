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


        /*
         * =====================================================
         * ACTUALIZAR UNA CARD
         * =====================================================
         */

        const updateCard = (index, property, value) => {

            const newCards = [...cards];

            newCards[index] = {
                ...newCards[index],
                [property]: value
            };

            setAttributes({
                cards: newCards
            });
        };


        /*
         * =====================================================
         * VARIABLES DEL BLOQUE
         * =====================================================
         */

        const blockProps = useBlockProps({
            className: 'cosmos-image-cards',

            style: {
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

                    {/* =================================================
                        CARD 1
                    ================================================= */}

                    <PanelBody
                        title="Card 1"
                        initialOpen={true}
                    >

                        <MediaUploadCheck>

                            <MediaUpload
                                allowedTypes={['image']}
                                value={cards[0]?.imageId || 0}

                                onSelect={(media) => {

                                    updateCard(
                                        0,
                                        'imageUrl',
                                        media.url
                                    );

                                    updateCard(
                                        0,
                                        'imageId',
                                        media.id
                                    );

                                    updateCard(
                                        0,
                                        'imageAlt',
                                        media.alt || ''
                                    );

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
                                        {cards[0]?.imageUrl
                                            ? 'Cambiar imagen'
                                            : 'Seleccionar imagen'
                                        }
                                    </Button>

                                )}
                            />

                        </MediaUploadCheck>

                        <p>
                            El título y la descripción se editan directamente sobre la card.
                        </p>

                    </PanelBody>


                    {/* =================================================
                        CARD 2
                    ================================================= */}

                    <PanelBody
                        title="Card 2"
                        initialOpen={false}
                    >

                        <MediaUploadCheck>

                            <MediaUpload
                                allowedTypes={['image']}
                                value={cards[1]?.imageId || 0}

                                onSelect={(media) => {

                                    updateCard(
                                        1,
                                        'imageUrl',
                                        media.url
                                    );

                                    updateCard(
                                        1,
                                        'imageId',
                                        media.id
                                    );

                                    updateCard(
                                        1,
                                        'imageAlt',
                                        media.alt || ''
                                    );

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
                                        {cards[1]?.imageUrl
                                            ? 'Cambiar imagen'
                                            : 'Seleccionar imagen'
                                        }
                                    </Button>

                                )}
                            />

                        </MediaUploadCheck>

                        <p>
                            El título y la descripción se editan directamente sobre la card.
                        </p>

                    </PanelBody>


                    {/* =================================================
                        CARD 3
                    ================================================= */}

                    <PanelBody
                        title="Card 3"
                        initialOpen={false}
                    >

                        <MediaUploadCheck>

                            <MediaUpload
                                allowedTypes={['image']}
                                value={cards[2]?.imageId || 0}

                                onSelect={(media) => {

                                    updateCard(
                                        2,
                                        'imageUrl',
                                        media.url
                                    );

                                    updateCard(
                                        2,
                                        'imageId',
                                        media.id
                                    );

                                    updateCard(
                                        2,
                                        'imageAlt',
                                        media.alt || ''
                                    );

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
                                        {cards[2]?.imageUrl
                                            ? 'Cambiar imagen'
                                            : 'Seleccionar imagen'
                                        }
                                    </Button>

                                )}
                            />

                        </MediaUploadCheck>

                        <p>
                            El título y la descripción se editan directamente sobre la card.
                        </p>

                    </PanelBody>


                    {/* =================================================
                        CARD 4
                    ================================================= */}

                    <PanelBody
                        title="Card 4"
                        initialOpen={false}
                    >

                        <MediaUploadCheck>

                            <MediaUpload
                                allowedTypes={['image']}
                                value={cards[3]?.imageId || 0}

                                onSelect={(media) => {

                                    updateCard(
                                        3,
                                        'imageUrl',
                                        media.url
                                    );

                                    updateCard(
                                        3,
                                        'imageId',
                                        media.id
                                    );

                                    updateCard(
                                        3,
                                        'imageAlt',
                                        media.alt || ''
                                    );

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
                                        {cards[3]?.imageUrl
                                            ? 'Cambiar imagen'
                                            : 'Seleccionar imagen'
                                        }
                                    </Button>

                                )}
                            />

                        </MediaUploadCheck>

                        <p>
                            El título y la descripción se editan directamente sobre la card.
                        </p>

                    </PanelBody>


                    {/* =================================================
                        DISEÑO
                    ================================================= */}

                    <PanelBody
                        title="Diseño"
                        initialOpen={true}
                    >

                        <RangeControl
                            label="Altura de las cards"
                            value={cardHeight}
                            onChange={(value) =>
                                setAttributes({
                                    cardHeight: value
                                })
                            }
                            min={350}
                            max={800}
                            step={10}
                        />

                        <RangeControl
                            label="Separación"
                            value={cardGap}
                            onChange={(value) =>
                                setAttributes({
                                    cardGap: value
                                })
                            }
                            min={0}
                            max={60}
                        />

                        <RangeControl
                            label="Oscurecimiento de imagen"
                            value={overlay}
                            onChange={(value) =>
                                setAttributes({
                                    overlay: value
                                })
                            }
                            min={0}
                            max={90}
                            step={5}
                        />

                    </PanelBody>


                    {/* =================================================
                        TÍTULO
                    ================================================= */}

                    <PanelBody
                        title="Título"
                        initialOpen={false}
                    >

                        <RangeControl
                            label="Tamaño"
                            value={titleSize}
                            onChange={(value) =>
                                setAttributes({
                                    titleSize: value
                                })
                            }
                            min={16}
                            max={60}
                        />

                        <SelectControl
                            label="Peso"
                            value={titleWeight}
                            options={[
                                {
                                    label: 'Regular',
                                    value: '400'
                                },
                                {
                                    label: 'Medio',
                                    value: '500'
                                },
                                {
                                    label: 'Seminegrita',
                                    value: '600'
                                },
                                {
                                    label: 'Negrita',
                                    value: '700'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    titleWeight: value
                                })
                            }
                        />

                        <SelectControl
                            label="Alineación"
                            value={titleAlign}
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
                                },
                                {
                                    label: 'Justificado',
                                    value: 'justify'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    titleAlign: value
                                })
                            }
                        />

                        <p>Color del título</p>

                        <ColorPalette
                            value={titleColor}
                            onChange={(value) =>
                                setAttributes({
                                    titleColor:
                                        value || '#ffffff'
                                })
                            }
                        />

                    </PanelBody>


                    {/* =================================================
                        DESCRIPCIÓN
                    ================================================= */}

                    <PanelBody
                        title="Descripción"
                        initialOpen={false}
                    >

                        <RangeControl
                            label="Tamaño"
                            value={descriptionSize}
                            onChange={(value) =>
                                setAttributes({
                                    descriptionSize: value
                                })
                            }
                            min={12}
                            max={36}
                        />

                        <SelectControl
                            label="Peso"
                            value={descriptionWeight}
                            options={[
                                {
                                    label: 'Regular',
                                    value: '400'
                                },
                                {
                                    label: 'Medio',
                                    value: '500'
                                },
                                {
                                    label: 'Seminegrita',
                                    value: '600'
                                },
                                {
                                    label: 'Negrita',
                                    value: '700'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    descriptionWeight:
                                        value
                                })
                            }
                        />

                        <SelectControl
                            label="Alineación"
                            value={descriptionAlign}
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
                                },
                                {
                                    label: 'Justificado',
                                    value: 'justify'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    descriptionAlign:
                                        value
                                })
                            }
                        />

                        <p>Color de la descripción</p>

                        <ColorPalette
                            value={descriptionColor}
                            onChange={(value) =>
                                setAttributes({
                                    descriptionColor:
                                        value || '#ffffff'
                                })
                            }
                        />

                    </PanelBody>


                    {/* =================================================
                        MARGEN
                    ================================================= */}

                    <PanelBody
                        title="Margen del bloque"
                        initialOpen={false}
                    >

                        <RangeControl
                            label="Margen superior"
                            value={blockMarginTop}
                            onChange={(value) =>
                                setAttributes({
                                    blockMarginTop: value
                                })
                            }
                            min={0}
                            max={200}
                        />

                        <RangeControl
                            label="Margen inferior"
                            value={blockMarginBottom}
                            onChange={(value) =>
                                setAttributes({
                                    blockMarginBottom: value
                                })
                            }
                            min={0}
                            max={200}
                        />

                    </PanelBody>

                </InspectorControls>


                {/* =================================================
                    BLOQUE
                ================================================= */}

                <section {...blockProps}>

                    <div className="container">

                        <div className="cosmos-image-cards__grid">

                            {cards.map((card, index) => {

                                const backgroundImage =
                                    card.imageUrl
                                        ? `linear-gradient(
                                            rgba(0,0,0,${overlay / 100}),
                                            rgba(0,0,0,${overlay / 100})
                                        ),
                                        url("${card.imageUrl}")`
                                        : undefined;


                                return (

                                    <article
                                        key={index}
                                        className="cosmos-image-cards__card"
                                        style={{
                                            backgroundImage
                                        }}
                                    >

                                        <div className="cosmos-image-cards__content">

                                            {/* TÍTULO ARRIBA */}

                                            <div className="cosmos-image-cards__title-area">

                                                <RichText
                                                    tagName="h3"
                                                    className="cosmos-image-cards__title"
                                                    value={
                                                        card.title
                                                    }
                                                    onChange={(value) =>
                                                        updateCard(
                                                            index,
                                                            'title',
                                                            value
                                                        )
                                                    }
                                                    placeholder="Título..."
                                                    allowedFormats={[
                                                        'core/bold',
                                                        'core/italic',
                                                        'core/link'
                                                    ]}
                                                />

                                            </div>


                                            {/* DESCRIPCIÓN ABAJO */}

                                            <div className="cosmos-image-cards__description-area">

                                                <RichText
                                                    tagName="div"
                                                    className="cosmos-image-cards__description"
                                                    value={
                                                        card.description
                                                    }
                                                    onChange={(value) =>
                                                        updateCard(
                                                            index,
                                                            'description',
                                                            value
                                                        )
                                                    }
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