namespace $ {
	$mol_style_define($bog_blitz_reviews, {
		flex: {
			direction: 'column',
			basis: '40rem',
		},
		margin: { top: $mol_gap.block, right: 'auto', left: 'auto' },
		padding: { top: $mol_gap.block, bottom: $mol_gap.block, left: $mol_gap.space, right: $mol_gap.space },
		width: '100%',
		maxWidth: '40rem',
		boxSizing: 'border-box',
		gap: $mol_gap.block,

		Title: {
			font: { size: '1.25rem', weight: 700 },
			padding: { bottom: $mol_gap.space },
		},

		Form_wrap: {
			flex: {
				direction: 'column',
			},
			gap: $mol_gap.space,
		},

		Form: {
			flex: {
				direction: 'column',
			},
			gap: $mol_gap.space,
			padding: $mol_gap.block,
			background: { color: $mol_theme.card },
			border: { radius: $mol_gap.round },
			boxShadow: `0 0 0 1px ${$mol_theme.line}`,
		},

		Submit: {
			align: { self: 'flex-end' },
			minWidth: '10rem',
		},

		List: {
			flex: {
				direction: 'column',
			},
			gap: $mol_gap.block,
			overflow: 'auto',
			maxHeight: '30rem',
		},

		Empty: {
			opacity: 0.6,
			textAlign: 'center',
			padding: $mol_gap.block,
		},
	})
}
