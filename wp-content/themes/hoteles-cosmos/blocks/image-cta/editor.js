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
    TextControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

import './style.css';
import './editor.css';


/*
|--------------------------------------------------------------------------
| CARD DEFAULT
|--------------------------------------------------------------------------
*/

const createDefaultCard = () => ({
    imageId: 0,
    imageUrl: '',
    imageAlt: '',
    buttonText: 'Conoce más',
    buttonUrl: ''
});


/*
|--------------------------------------------------------------------------
| EDIT
|--------------------------------------------------------------------------
*/

const Edit = ({
    attributes,
    setAttributes
}) => {

    const {
        marginTop,
        marginBottom,
        cardGap,
        imageAspectRatio,
        buttonBackgroundColor,
        buttonTextColor,
        buttonBorderColor,
        buttonBorderRadius,
        buttonBorderWidth,
        buttonHeight,
        cards
    } = attributes;


    /*
    |--------------------------------------------------------------------------
    | NORMALIZAR CARDS
    |--------------------------------------------------------------------------
    */

    const normalizedCards = Array.isArray(cards)
        ? [
            cards[0] || createDefaultCard(),
            cards[1] || createDefaultCard()
        ]
        : [
            createDefaultCard(),
            createDefaultCard()
        ];


    /*
    |--------------------------------------------------------------------------
    | UPDATE CARD
    |--------------------------------------------------------------------------
    */

    const updateCard = (
        index,
        property,
        value
    ) => {

        const updatedCards = [
            ...normalizedCards
        ];

        updatedCards[index] = {
            ...updatedCards[index],
            [property]: value
        };

        setAttributes({
            cards: updatedCards
        });
    };


    /*
    |--------------------------------------------------------------------------
    | UPDATE IMAGE
    |--------------------------------------------------------------------------
    */

    const updateCardImage = (
        index,
        media
    ) => {

        const updatedCards = [
            ...normalizedCards
        ];

        updatedCards[index] = {
            ...updatedCards[index],
            imageId: media?.id || 0,
            imageUrl: media?.url || '',
            imageAlt: media?.alt || ''
        };

        setAttributes({
            cards: updatedCards
        });
    };


    /*
    |--------------------------------------------------------------------------
    | BLOCK PROPS
    |--------------------------------------------------------------------------
    */

    const blockProps = useBlockProps({
        className: 'cosmos-image-cta',
        style: {
            '--cosmos-image-cta-margin-top':
                `${marginTop}px`,

            '--cosmos-image-cta-margin-bottom':
                `${marginBottom}px`,

            '--cosmos-image-cta-gap':
                `${cardGap}px`,

            '--cosmos-image-cta-image-aspect-ratio':
                imageAspectRatio.replace('/', ' / '),

            '--cosmos-image-cta-button-background':
                buttonBackgroundColor,

            '--cosmos-image-cta-button-color':
                buttonTextColor,

            '--cosmos-image-cta-button-border-color':
                buttonBorderColor,

            '--cosmos-image-cta-button-radius':
                `${buttonBorderRadius}px`,

            '--cosmos-image-cta-button-border-width':
                `${buttonBorderWidth}px`,

            '--cosmos-image-cta-button-height':
                `${buttonHeight}px`
        }
    });


    /*
    |--------------------------------------------------------------------------
    | RENDER CARD
    |--------------------------------------------------------------------------
    */

    const renderCard = (
        card,
        index
    ) => {

        return (
            <div
                className="cosmos-image-cta__card"
                key={index}
            >

                {/*----------------------------------------------------------*
                 * IMAGEN
                 *----------------------------------------------------------*/}

                <div className="cosmos-image-cta__image-wrapper">

                    {card.imageUrl ? (

                        <img
                            className="cosmos-image-cta__image"
                            src={card.imageUrl}
                            alt={card.imageAlt || ''}
                        />

                    ) : (

                        <div className="cosmos-image-cta__image-placeholder">

                            <MediaUploadCheck>

                                <MediaUpload
                                    onSelect={(media) =>
                                        updateCardImage(
                                            index,
                                            media
                                        )
                                    }
                                    allowedTypes={[
                                        'image'
                                    ]}
                                    value={
                                        card.imageId ||
                                        undefined
                                    }
                                    render={({ open }) => (

                                        <Button
                                            variant="primary"
                                            onClick={open}
                                        >
                                            Seleccionar imagen
                                        </Button>

                                    )}
                                />

                            </MediaUploadCheck>

                        </div>

                    )}

                    {card.imageUrl && (

                        <div className="cosmos-image-cta__image-actions">

                            <MediaUploadCheck>

                                <MediaUpload
                                    onSelect={(media) =>
                                        updateCardImage(
                                            index,
                                            media
                                        )
                                    }
                                    allowedTypes={[
                                        'image'
                                    ]}
                                    value={
                                        card.imageId ||
                                        undefined
                                    }
                                    render={({ open }) => (

                                        <Button
                                            variant="secondary"
                                            onClick={open}
                                        >
                                            Cambiar imagen
                                        </Button>

                                    )}
                                />

                            </MediaUploadCheck>

                        </div>

                    )}

                </div>


                {/*----------------------------------------------------------*
                 * CTA
                 *----------------------------------------------------------*/}

                <div className="cosmos-image-cta__button">

                    {card.buttonText ||
                        'Conoce más'
                    }

                </div>

            </div>
        );
    };


    /*
    |--------------------------------------------------------------------------
    | RETURN
    |--------------------------------------------------------------------------
    */

    return (
        <Fragment>

            <InspectorControls>


                {/*----------------------------------------------------------*
                 * ESPACIADO
                 *----------------------------------------------------------*/}

                <PanelBody
                    title="Espaciado"
                    initialOpen={true}
                >

                    <RangeControl
                        label="Margen superior"
                        value={marginTop}
                        onChange={(value) =>
                            setAttributes({
                                marginTop:
                                    value
                            })
                        }
                        min={0}
                        max={200}
                        step={1}
                    />


                    <RangeControl
                        label="Margen inferior"
                        value={marginBottom}
                        onChange={(value) =>
                            setAttributes({
                                marginBottom:
                                    value
                            })
                        }
                        min={0}
                        max={200}
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
                        max={100}
                        step={1}
                    />

                </PanelBody>


                {/*----------------------------------------------------------*
                 * IMAGEN
                 *----------------------------------------------------------*/}

                <PanelBody
                    title="Imagen"
                    initialOpen={false}
                >

                    <TextControl
                        label="Relación de aspecto"
                        value={
                            imageAspectRatio
                        }
                        onChange={(value) =>
                            setAttributes({
                                imageAspectRatio:
                                    value
                            })
                        }
                        help="Ejemplo: 4/3, 16/9 o 3/2"
                    />

                </PanelBody>


                {/*----------------------------------------------------------*
                 * BOTÓN
                 *----------------------------------------------------------*/}

                <PanelBody
                    title="Botón CTA"
                    initialOpen={true}
                >

                    <p>
                        Fondo del botón
                    </p>

                    <ColorPalette
                        value={
                            buttonBackgroundColor
                        }
                        onChange={(value) =>
                            setAttributes({
                                buttonBackgroundColor:
                                    value ||
                                    '#111111'
                            })
                        }
                    />


                    <p>
                        Color del texto
                    </p>

                    <ColorPalette
                        value={
                            buttonTextColor
                        }
                        onChange={(value) =>
                            setAttributes({
                                buttonTextColor:
                                    value ||
                                    '#ffffff'
                            })
                        }
                    />


                    <p>
                        Color del borde
                    </p>

                    <ColorPalette
                        value={
                            buttonBorderColor
                        }
                        onChange={(value) =>
                            setAttributes({
                                buttonBorderColor:
                                    value ||
                                    '#111111'
                            })
                        }
                    />


                    <RangeControl
                        label="Border radius"
                        value={
                            buttonBorderRadius
                        }
                        onChange={(value) =>
                            setAttributes({
                                buttonBorderRadius:
                                    value
                            })
                        }
                        min={0}
                        max={50}
                        step={1}
                    />


                    <RangeControl
                        label="Grosor del borde"
                        value={
                            buttonBorderWidth
                        }
                        onChange={(value) =>
                            setAttributes({
                                buttonBorderWidth:
                                    value
                            })
                        }
                        min={0}
                        max={10}
                        step={1}
                    />


                    <RangeControl
                        label="Altura del botón"
                        value={
                            buttonHeight
                        }
                        onChange={(value) =>
                            setAttributes({
                                buttonHeight:
                                    value
                            })
                        }
                        min={30}
                        max={120}
                        step={1}
                    />

                </PanelBody>


                {/*----------------------------------------------------------*
                 * CARD 1
                 *----------------------------------------------------------*/}

                <PanelBody
                    title="Card 1"
                    initialOpen={false}
                >

                    <MediaUploadCheck>

                        <MediaUpload
                            onSelect={(media) =>
                                updateCardImage(
                                    0,
                                    media
                                )
                            }
                            allowedTypes={[
                                'image'
                            ]}
                            value={
                                normalizedCards[0]
                                    .imageId ||
                                undefined
                            }
                            render={({ open }) => (

                                <Button
                                    variant="secondary"
                                    onClick={open}
                                    style={{
                                        width: '100%',
                                        justifyContent:
                                            'center',
                                        marginBottom:
                                            '12px'
                                    }}
                                >
                                    {normalizedCards[0]
                                        .imageUrl
                                        ? 'Cambiar imagen'
                                        : 'Seleccionar imagen'
                                    }
                                </Button>

                            )}
                        />

                    </MediaUploadCheck>


                    <TextControl
                        label="Texto del botón"
                        value={
                            normalizedCards[0]
                                .buttonText || ''
                        }
                        onChange={(value) =>
                            updateCard(
                                0,
                                'buttonText',
                                value
                            )
                        }
                    />


                    <TextControl
                        label="Enlace del botón"
                        value={
                            normalizedCards[0]
                                .buttonUrl || ''
                        }
                        onChange={(value) =>
                            updateCard(
                                0,
                                'buttonUrl',
                                value
                            )
                        }
                        type="url"
                        placeholder="https://..."
                    />

                </PanelBody>


                {/*----------------------------------------------------------*
                 * CARD 2
                 *----------------------------------------------------------*/}

                <PanelBody
                    title="Card 2"
                    initialOpen={false}
                >

                    <MediaUploadCheck>

                        <MediaUpload
                            onSelect={(media) =>
                                updateCardImage(
                                    1,
                                    media
                                )
                            }
                            allowedTypes={[
                                'image'
                            ]}
                            value={
                                normalizedCards[1]
                                    .imageId ||
                                undefined
                            }
                            render={({ open }) => (

                                <Button
                                    variant="secondary"
                                    onClick={open}
                                    style={{
                                        width: '100%',
                                        justifyContent:
                                            'center',
                                        marginBottom:
                                            '12px'
                                    }}
                                >
                                    {normalizedCards[1]
                                        .imageUrl
                                        ? 'Cambiar imagen'
                                        : 'Seleccionar imagen'
                                    }
                                </Button>

                            )}
                        />

                    </MediaUploadCheck>


                    <TextControl
                        label="Texto del botón"
                        value={
                            normalizedCards[1]
                                .buttonText || ''
                        }
                        onChange={(value) =>
                            updateCard(
                                1,
                                'buttonText',
                                value
                            )
                        }
                    />


                    <TextControl
                        label="Enlace del botón"
                        value={
                            normalizedCards[1]
                                .buttonUrl || ''
                        }
                        onChange={(value) =>
                            updateCard(
                                1,
                                'buttonUrl',
                                value
                            )
                        }
                        type="url"
                        placeholder="https://..."
                    />

                </PanelBody>

            </InspectorControls>


            <div {...blockProps}>

                <div className="cosmos-image-cta__container">

                    <div className="cosmos-image-cta__grid">

                        {normalizedCards.map(
                            (card, index) =>
                                renderCard(
                                    card,
                                    index
                                )
                        )}

                    </div>

                </div>

            </div>

        </Fragment>
    );
};


/*
|--------------------------------------------------------------------------
| REGISTER
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