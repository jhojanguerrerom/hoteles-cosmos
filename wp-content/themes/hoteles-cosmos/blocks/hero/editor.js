import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
    URLInput
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    RangeControl,
    SelectControl,
    Button,
    ColorPicker
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

function Edit({ attributes, setAttributes }) {
    const {
        eyebrow, title, subtitle, imageId, imageUrl, imageAlt,
        buttonText, buttonUrl, overlay, contentWidth, contentPosition,
        eyebrowSize, eyebrowColor, eyebrowAlign, eyebrowWeight,
        titleSize, titleColor, titleAlign, titleWeight,
        subtitleSize, subtitleColor, subtitleAlign, subtitleWeight
    } = attributes;

    const onSelectImage = (media) => {
        if (!media || !media.url) return;
        setAttributes({
            imageId: media.id,
            imageUrl: media.url,
            imageAlt: media.alt || media.title || ''
        });
    };

    const removeImage = () => {
        setAttributes({ imageId: 0, imageUrl: '', imageAlt: '' });
    };

    const contentWidths = { small: '760px', medium: '900px', large: '1100px' };
    const contentMaxWidth = contentWidths[contentWidth] || contentWidths.medium;

    const blockProps = useBlockProps({
        className: `cosmos-hero cosmos-hero--${contentWidth || 'medium'} cosmos-hero--position-${contentPosition || 'left'}`
    });

    const eyebrowStyle = {
        fontSize: `${eyebrowSize ?? 13}px`,
        color: eyebrowColor || 'rgba(255, 255, 255, 0.78)',
        textAlign: eyebrowAlign || 'left',
        fontWeight: eyebrowWeight || '600'
    };
    const titleStyle = {
        fontSize: `clamp(32px, ${Math.max(2, (titleSize ?? 64) / 16)}vw, ${titleSize ?? 64}px)`,
        color: titleColor || '#ffffff',
        textAlign: titleAlign || 'left',
        fontWeight: titleWeight || '700'
    };
    const subtitleStyle = {
        fontSize: `${subtitleSize ?? 18}px`,
        color: subtitleColor || '#ffffff',
        textAlign: subtitleAlign || 'left',
        fontWeight: subtitleWeight || '500'
    };

    const alignmentOptions = [
        { label: __('Izquierda', 'hoteles-cosmos'), value: 'left' },
        { label: __('Centro', 'hoteles-cosmos'), value: 'center' },
        { label: __('Derecha', 'hoteles-cosmos'), value: 'right' }
    ];
    const weightOptions = [
        { label: __('Normal (400)', 'hoteles-cosmos'), value: '400' },
        { label: __('Medio (500)', 'hoteles-cosmos'), value: '500' },
        { label: __('Seminegrita (600)', 'hoteles-cosmos'), value: '600' },
        { label: __('Negrita (700)', 'hoteles-cosmos'), value: '700' }
    ];

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Imagen del Hero', 'hoteles-cosmos')} initialOpen={true}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={imageId}
                            render={({ open }) => (
                                <div>
                                    {imageUrl ? (
                                        <>
                                            <img src={imageUrl} alt={imageAlt} style={{
                                                width: '100%', height: 'auto', display: 'block',
                                                marginBottom: '12px'
                                            }} />
                                            <Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
                                                {__('Cambiar imagen', 'hoteles-cosmos')}
                                            </Button>
                                            <Button variant="link" isDestructive onClick={removeImage}>
                                                {__('Eliminar', 'hoteles-cosmos')}
                                            </Button>
                                        </>
                                    ) : (
                                        <Button variant="primary" onClick={open}>
                                            {__('Seleccionar imagen', 'hoteles-cosmos')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                    {imageUrl && (
                        <TextControl
                            label={__('Texto alternativo', 'hoteles-cosmos')}
                            value={imageAlt}
                            onChange={(value) => setAttributes({ imageAlt: value })}
                            help={__('Describe brevemente la imagen. Es importante para accesibilidad y SEO.', 'hoteles-cosmos')}
                        />
                    )}
                </PanelBody>

                <PanelBody title={__('Ancho y posición', 'hoteles-cosmos')} initialOpen={true}>
                    <SelectControl
                        label={__('Ancho del contenido', 'hoteles-cosmos')}
                        value={contentWidth || 'medium'}
                        options={[
                            { label: __('Estrecho (760 px)', 'hoteles-cosmos'), value: 'small' },
                            { label: __('Medio (900 px)', 'hoteles-cosmos'), value: 'medium' },
                            { label: __('Amplio (1100 px)', 'hoteles-cosmos'), value: 'large' }
                        ]}
                        onChange={(value) => setAttributes({ contentWidth: value })}
                        help={__('Controla el ancho máximo del grupo de textos.', 'hoteles-cosmos')}
                    />
                    <SelectControl
                        label={__('Posición del contenido', 'hoteles-cosmos')}
                        value={contentPosition || 'left'}
                        options={[
                            { label: __('Izquierda', 'hoteles-cosmos'), value: 'left' },
                            { label: __('Centro horizontal', 'hoteles-cosmos'), value: 'center' },
                            { label: __('Derecha', 'hoteles-cosmos'), value: 'right' },
                            { label: __('Centro exacto del banner', 'hoteles-cosmos'), value: 'center-banner' }
                        ]}
                        onChange={(value) => setAttributes({ contentPosition: value })}
                        help={__('Centra el grupo completo de textos y botón dentro del banner.', 'hoteles-cosmos')}
                    />
                    <RangeControl
                        label={__('Oscurecimiento de imagen', 'hoteles-cosmos')}
                        value={overlay ?? 55}
                        onChange={(value) => setAttributes({ overlay: value })}
                        min={0} max={90} step={5}
                        help={__('Controla la intensidad de la máscara sobre la imagen.', 'hoteles-cosmos')}
                    />
                </PanelBody>

                <PanelBody title={__('Texto pequeño / categoría', 'hoteles-cosmos')} initialOpen={false}>
                    <RangeControl label={__('Tamaño (px)', 'hoteles-cosmos')} value={eyebrowSize ?? 13}
                        onChange={(value) => setAttributes({ eyebrowSize: value })} min={8} max={32} />
                    <SelectControl label={__('Alineación', 'hoteles-cosmos')} value={eyebrowAlign || 'left'}
                        options={alignmentOptions} onChange={(value) => setAttributes({ eyebrowAlign: value })} />
                    <SelectControl label={__('Grosor', 'hoteles-cosmos')} value={eyebrowWeight || '600'}
                        options={weightOptions} onChange={(value) => setAttributes({ eyebrowWeight: value })} />
                    <p>{__('Color del texto', 'hoteles-cosmos')}</p>
                    <ColorPicker color={eyebrowColor || '#ffffff'}
                        onChangeComplete={(value) => setAttributes({ eyebrowColor: value.hex })} disableAlpha />
                </PanelBody>

                <PanelBody title={__('Título principal', 'hoteles-cosmos')} initialOpen={false}>
                    <RangeControl label={__('Tamaño máximo (px)', 'hoteles-cosmos')} value={titleSize ?? 64}
                        onChange={(value) => setAttributes({ titleSize: value })} min={24} max={120} />
                    <SelectControl label={__('Alineación', 'hoteles-cosmos')} value={titleAlign || 'left'}
                        options={alignmentOptions} onChange={(value) => setAttributes({ titleAlign: value })} />
                    <SelectControl label={__('Grosor', 'hoteles-cosmos')} value={titleWeight || '700'}
                        options={weightOptions} onChange={(value) => setAttributes({ titleWeight: value })} />
                    <p>{__('Color del título', 'hoteles-cosmos')}</p>
                    <ColorPicker color={titleColor || '#ffffff'}
                        onChangeComplete={(value) => setAttributes({ titleColor: value.hex })} disableAlpha />
                </PanelBody>

                <PanelBody title={__('Subtítulo / descripción', 'hoteles-cosmos')} initialOpen={false}>
                    <RangeControl label={__('Tamaño (px)', 'hoteles-cosmos')} value={subtitleSize ?? 18}
                        onChange={(value) => setAttributes({ subtitleSize: value })} min={10} max={48} />
                    <SelectControl label={__('Alineación', 'hoteles-cosmos')} value={subtitleAlign || 'left'}
                        options={alignmentOptions} onChange={(value) => setAttributes({ subtitleAlign: value })} />
                    <SelectControl label={__('Grosor', 'hoteles-cosmos')} value={subtitleWeight || '500'}
                        options={weightOptions} onChange={(value) => setAttributes({ subtitleWeight: value })} />
                    <p>{__('Color del subtítulo', 'hoteles-cosmos')}</p>
                    <ColorPicker color={subtitleColor || '#ffffff'}
                        onChangeComplete={(value) => setAttributes({ subtitleColor: value.hex })} disableAlpha />
                </PanelBody>

                <PanelBody title={__('Botón / CTA', 'hoteles-cosmos')} initialOpen={false}>
                    <TextControl label={__('Texto del botón', 'hoteles-cosmos')} value={buttonText}
                        placeholder={__('Ej: Reservar ahora', 'hoteles-cosmos')}
                        onChange={(value) => setAttributes({ buttonText: value })} />
                    <div style={{ marginTop: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                            {__('URL del botón', 'hoteles-cosmos')}
                        </label>
                        <URLInput value={buttonUrl}
                            onChange={(value) => setAttributes({ buttonUrl: value })} />
                    </div>
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="cosmos-hero__preview">
                    {imageUrl ? (
                        <img className="cosmos-hero__image" src={imageUrl} alt="" />
                    ) : (
                        <div className="cosmos-hero__image-placeholder">
                            {__('Selecciona una imagen para comenzar', 'hoteles-cosmos')}
                        </div>
                    )}
                    <div className="cosmos-hero__overlay" style={{ opacity: (overlay ?? 55) / 100 }} />
                    <div className="container">
                        <div className={`cosmos-hero__content cosmos-hero__content--${contentWidth || 'medium'}`} style={{ maxWidth: contentMaxWidth }}>
                            <RichText tagName="div" className="cosmos-hero__eyebrow"
                                style={eyebrowStyle} value={eyebrow}
                                onChange={(value) => setAttributes({ eyebrow: value })}
                                placeholder={__('Texto pequeño / categoría', 'hoteles-cosmos')} allowedFormats={[]} />
                            <RichText tagName="h1" className="cosmos-hero__title"
                                style={titleStyle} value={title}
                                onChange={(value) => setAttributes({ title: value })}
                                placeholder={__('Título principal', 'hoteles-cosmos')} allowedFormats={[]} />
                            <RichText tagName="p" className="cosmos-hero__subtitle"
                                style={subtitleStyle} value={subtitle}
                                onChange={(value) => setAttributes({ subtitle: value })}
                                placeholder={__('Subtítulo o descripción', 'hoteles-cosmos')} allowedFormats={[]} />
                            {buttonText && <div className="cosmos-hero__button-preview">{buttonText}</div>}
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

registerBlockType('hoteles-cosmos/hero', { edit: Edit });
