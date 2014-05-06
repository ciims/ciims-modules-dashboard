<section id="secondary-navigation">
	<span class="fa fa-ellipsis-v" id="nav-icon"></span>
	<?php if (isset($navigation['items'])): ?>
		<?php $this->widget('zii.widgets.CMenu', array(
			'htmlOptions' => array('id' => 'secondary-nav-items'),
			'encodeLabel' => false,
			'items' => $navigation['items']
		)); ?>
	<?php endif; ?>		
	<div class="pull-right">
		<span class="greeting">
			<?php echo Yii::t('Dashboard.views', '{{greeting}}, {{user}}', array(
				'{{greeting}}' => CHtml::tag('span', array(), Yii::t('Dashboard.views', 'Hi')),
				'{{user}}' => Yii::app()->user->displayName
			)); ?>
		</span>
		<?php echo CHtml::image(Users::model()->findByPk(Yii::app()->user->id)->gravatarImage(25), NULL, array('class' => 'user-image')); ?>
	</div>
	<div class="clearfix"></div>
</section>