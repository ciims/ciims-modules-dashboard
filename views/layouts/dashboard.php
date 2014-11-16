<?php $this->beginContent('/layouts/main'); ?>
	<?php $this->renderPartial('/default/secondary-nav', array(
		'navigation' => array(
			'items' => array(
				array(
					'url' => '#',
					'label' => NULL,
					'linkOptions' => array('id' => 'installCardButton', 'class' => 'fa fa-plus', 'title' => Yii::t('Dashboard.views', 'Add new Card')), 
					'active' => false,
				),
			)
		)
	)); ?>

	<main>
		<?php echo $content; ?>
	</main>
<?php $this->endContent(); ?>