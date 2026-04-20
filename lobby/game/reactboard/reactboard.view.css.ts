namespace $.$$ {

	const table_style = {
		flex: { direction: 'column', grow: 1, basis: 0 },
		align: { items: 'center' },
		minWidth: '5rem',
	} as const

	const title_style = {
		font: { size: '2rem' },
		padding: { bottom: '0.25rem' },
	} as const

	$mol_style_define($bog_blitz_lobby_game_reactboard, {
		flex: {
			direction: 'row',
			wrap: 'wrap',
		},
		gap: '0.5rem',
		padding: { top: '1.5rem', left: '1rem', right: '1rem' },
		width: '100%',
		Table_heart: table_style,
		Table_smile: table_style,
		Table_fire: table_style,
		Table_clap: table_style,
		Table_poop: table_style,
		Title_heart: title_style,
		Title_smile: title_style,
		Title_fire: title_style,
		Title_clap: title_style,
		Title_poop: title_style,
		Row: {
			gap: '0.5rem',
			justify: { content: 'center' },
		},
		Row_name: {
			font: { size: '0.875rem' },
		},
		Row_count: {
			font: { size: '0.875rem', weight: 700 },
		},
		'@media': {
			'(width < 600px)': {
				padding: { top: '1rem', left: '0.5rem', right: '0.5rem' },
				gap: '0.25rem',
				Title_heart: { font: { size: '1.5rem' } },
				Title_smile: { font: { size: '1.5rem' } },
				Title_fire: { font: { size: '1.5rem' } },
				Title_clap: { font: { size: '1.5rem' } },
				Title_poop: { font: { size: '1.5rem' } },
				Table_heart: { minWidth: '3.5rem' },
				Table_smile: { minWidth: '3.5rem' },
				Table_fire: { minWidth: '3.5rem' },
				Table_clap: { minWidth: '3.5rem' },
				Table_poop: { minWidth: '3.5rem' },
				Row_name: { font: { size: '0.75rem' } },
				Row_count: { font: { size: '0.75rem', weight: 700 } },
			},
		},
	})
}
