import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	RangeControl,
	ColorPalette,
	TextControl,
	SelectControl,
} from '@wordpress/components';

import ServerSideRender from '@wordpress/server-side-render';

import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';

function Edit({ attributes, setAttributes }) {

	const {
		postsPerPage,
		titleFontSize,
		titleColor,
		titleWeight,
		titleAlignment,
		descriptionFontSize,
		descriptionColor,
		descriptionWeight,
		descriptionAlignment,
		buttonText,
		buttonTextColor,
		buttonBackground,
		buttonBorderColor,
		buttonBorderWidth,
		buttonBorderRadius,
		buttonAlignment,
		buttonPaddingVertical,
		buttonPaddingHorizontal,
		cardBackground,
		cardBorderRadius,
		cardGap,
		marginTop,
		marginBottom,
	} = attributes;

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>

				<PanelBody
					title={__('Noticias', 'hoteles-cosmos')}
					initialOpen={true}
				>
					<RangeControl
						label={__('Cantidad de noticias', 'hoteles-cosmos')}
						value={postsPerPage}
						onChange={(value) =>
							setAttributes({ postsPerPage: value })
						}
						min={1}
						max={30}
					/>
				</PanelBody>

				<PanelBody
					title={__('Título', 'hoteles-cosmos')}
					initialOpen={false}
				>
					<RangeControl
						label={__('Tamaño', 'hoteles-cosmos')}
						value={titleFontSize}
						onChange={(value) =>
							setAttributes({ titleFontSize: value })
						}
						min={10}
						max={60}
					/>

					<SelectControl
						label={__('Peso', 'hoteles-cosmos')}
						value={titleWeight}
						options={[
							{ label: 'Normal', value: '400' },
							{ label: 'Medio', value: '500' },
							{ label: 'Seminegrita', value: '600' },
							{ label: 'Negrita', value: '700' },
							{ label: 'Extra negrita', value: '800' },
						]}
						onChange={(value) =>
							setAttributes({ titleWeight: value })
						}
					/>

					<SelectControl
						label={__('Alineación', 'hoteles-cosmos')}
						value={titleAlignment}
						options={[
							{ label: 'Izquierda', value: 'left' },
							{ label: 'Centro', value: 'center' },
							{ label: 'Derecha', value: 'right' },
						]}
						onChange={(value) =>
							setAttributes({ titleAlignment: value })
						}
					/>

					<p>{__('Color', 'hoteles-cosmos')}</p>

					<ColorPalette
						value={titleColor}
						onChange={(value) =>
							setAttributes({
								titleColor: value || '#222222',
							})
						}
					/>
				</PanelBody>

				<PanelBody
					title={__('Descripción', 'hoteles-cosmos')}
					initialOpen={false}
				>
					<RangeControl
						label={__('Tamaño', 'hoteles-cosmos')}
						value={descriptionFontSize}
						onChange={(value) =>
							setAttributes({
								descriptionFontSize: value,
							})
						}
						min={10}
						max={40}
					/>

					<SelectControl
						label={__('Peso', 'hoteles-cosmos')}
						value={descriptionWeight}
						options={[
							{ label: 'Normal', value: '400' },
							{ label: 'Medio', value: '500' },
							{ label: 'Seminegrita', value: '600' },
							{ label: 'Negrita', value: '700' },
						]}
						onChange={(value) =>
							setAttributes({
								descriptionWeight: value,
							})
						}
					/>

					<SelectControl
						label={__('Alineación', 'hoteles-cosmos')}
						value={descriptionAlignment}
						options={[
							{ label: 'Izquierda', value: 'left' },
							{ label: 'Centro', value: 'center' },
							{ label: 'Derecha', value: 'right' },
						]}
						onChange={(value) =>
							setAttributes({
								descriptionAlignment: value,
							})
						}
					/>

					<p>{__('Color', 'hoteles-cosmos')}</p>

					<ColorPalette
						value={descriptionColor}
						onChange={(value) =>
							setAttributes({
								descriptionColor: value || '#555555',
							})
						}
					/>
				</PanelBody>

				<PanelBody
					title={__('Botón', 'hoteles-cosmos')}
					initialOpen={false}
				>
					<TextControl
						label={__('Texto', 'hoteles-cosmos')}
						value={buttonText}
						onChange={(value) =>
							setAttributes({ buttonText: value })
						}
					/>

					<SelectControl
						label={__('Alineación', 'hoteles-cosmos')}
						value={buttonAlignment}
						options={[
							{ label: 'Izquierda', value: 'left' },
							{ label: 'Centro', value: 'center' },
							{ label: 'Derecha', value: 'right' },
						]}
						onChange={(value) =>
							setAttributes({
								buttonAlignment: value,
							})
						}
					/>

					<p>{__('Color del texto', 'hoteles-cosmos')}</p>

					<ColorPalette
						value={buttonTextColor}
						onChange={(value) =>
							setAttributes({
								buttonTextColor: value || '#ffffff',
							})
						}
					/>

					<p>{__('Color de fondo', 'hoteles-cosmos')}</p>

					<ColorPalette
						value={buttonBackground}
						onChange={(value) =>
							setAttributes({
								buttonBackground: value || '#000000',
							})
						}
					/>

					<p>{__('Color del borde', 'hoteles-cosmos')}</p>

					<ColorPalette
						value={buttonBorderColor}
						onChange={(value) =>
							setAttributes({
								buttonBorderColor: value || '#000000',
							})
						}
					/>

					<RangeControl
						label={__('Grosor del borde', 'hoteles-cosmos')}
						value={buttonBorderWidth}
						onChange={(value) =>
							setAttributes({
								buttonBorderWidth: value,
							})
						}
						min={0}
						max={10}
					/>

					<RangeControl
						label={__('Radio del borde', 'hoteles-cosmos')}
						value={buttonBorderRadius}
						onChange={(value) =>
							setAttributes({
								buttonBorderRadius: value,
							})
						}
						min={0}
						max={50}
					/>

					<RangeControl
						label={__('Padding vertical', 'hoteles-cosmos')}
						value={buttonPaddingVertical}
						onChange={(value) =>
							setAttributes({
								buttonPaddingVertical: value,
							})
						}
						min={0}
						max={40}
					/>

					<RangeControl
						label={__('Padding horizontal', 'hoteles-cosmos')}
						value={buttonPaddingHorizontal}
						onChange={(value) =>
							setAttributes({
								buttonPaddingHorizontal: value,
							})
						}
						min={0}
						max={60}
					/>
				</PanelBody>

				<PanelBody
					title={__('Tarjetas', 'hoteles-cosmos')}
					initialOpen={false}
				>
					<p>{__('Color de fondo', 'hoteles-cosmos')}</p>

					<ColorPalette
						value={cardBackground}
						onChange={(value) =>
							setAttributes({
								cardBackground: value || '#ffffff',
							})
						}
					/>

					<RangeControl
						label={__('Radio de la tarjeta', 'hoteles-cosmos')}
						value={cardBorderRadius}
						onChange={(value) =>
							setAttributes({
								cardBorderRadius: value,
							})
						}
						min={0}
						max={50}
					/>

					<RangeControl
						label={__('Separación entre tarjetas', 'hoteles-cosmos')}
						value={cardGap}
						onChange={(value) =>
							setAttributes({ cardGap: value })
						}
						min={0}
						max={60}
					/>
				</PanelBody>

				<PanelBody
					title={__('Espaciado de la sección', 'hoteles-cosmos')}
					initialOpen={false}
				>
					<RangeControl
						label={__('Margen superior', 'hoteles-cosmos')}
						value={marginTop}
						onChange={(value) =>
							setAttributes({ marginTop: value })
						}
						min={0}
						max={200}
					/>

					<RangeControl
						label={__('Margen inferior', 'hoteles-cosmos')}
						value={marginBottom}
						onChange={(value) =>
							setAttributes({ marginBottom: value })
						}
						min={0}
						max={200}
					/>
				</PanelBody>

			</InspectorControls>

			<div {...blockProps}>
				<ServerSideRender
					block="hoteles-cosmos/news-grid"
					attributes={attributes}
				/>
			</div>
		</>
	);
}

registerBlockType(metadata.name, {
	...metadata,
	edit: Edit,
});