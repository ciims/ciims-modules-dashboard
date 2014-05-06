<?php $this->beginContent('/layouts/main'); ?>
	<?php $this->renderPartial('/default/secondary-nav', array(
		'navigation' => array(
			'items' => array()
		)
	)); ?>

	<main>
		<?php echo $content; ?>
	</main>
<?php $this->endContent(); ?>