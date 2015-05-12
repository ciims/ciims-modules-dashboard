<!DOCTTYPE html>
<html lang="<?php echo Yii::app()->getLanguage(); ?>">
    <head>
    	<meta name="viewport" content="initial-scale=1.0">
	    <meta charset="UTF-8" />
	    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
		<link rel="icon" href="/favicon.ico" type="image/x-icon">
		<title><?php echo Yii::t('Dashboard.views', 'CiiMS Dashboard | {{pagetitle}}', array('{{pagetitle}}' => CHtml::encode($this->pageTitle))); ?></title>
        <?php Yii::app()->clientScript->registerCssFile($this->asset .'/dist/'. (YII_DEBUG ? 'dashboard.css' : 'dashboard.min.css')); ?>
        <?php Yii::app()->clientScript->registerScriptFile($this->asset .'/dist/'. (YII_DEBUG ? 'dashboard.js' : 'dashboard.min.js')); ?>
        <?php Yii::app()->clientScript->registerCssFile('https://fonts.googleapis.com/css?family=Open+Sans:400,600'); ?>
    </head>
    <body>
    	<section id="body">
	    	<section id="main-navigation">
				<header>
					<?php echo CHtml::link(CHtml::image($this->asset .'/dist/images/ciims.png'), Yii::app()->getBaseUrl(true)); ?>
				</header>
				<nav>
					<?php $this->widget('zii.widgets.CMenu', array(
						'encodeLabel' => false,
						'items' => array(
							array(
								'label' => CHtml::tag('i', array('class' => 'fa fa-th-large'), NULL),
								'url' => $this->createUrl('/dashboard'), 
								'active' => $this->id == 'default'
							),
							array(
								'label' => CHtml::tag('i', array('class' => 'fa fa-pencil'), NULL),
								'url' => $this->createUrl('/dashboard/content'),
								'active' => $this->id == 'content'
							),
							array(
								'label' => CHtml::tag('i', array('class' => 'fa fa-cogs'), NULL),
								'url' => $this->createUrl('/dashboard/settings'),
								'active' => !in_array($this->id, array('default', 'content'))
							),
						)
					)); ?>
				</nav>
				<footer>
					<?php echo CHtml::link(CHtml::tag('span', array('class' => 'fa fa-power-off'), NULL), $this->createUrl('/logout')); ?>
				</footer>
			</section>

			<div class="tc-main">
				<?php echo $content; ?>
			</div>

			<div class="clearfix"></div>
		</section>
		<?php Cii::loadUserInfo(); ?>
		<span id="endpoint" data-attr-endpoint="<?php echo Yii::app()->getBaseUrl(true); ?>" style="display:none"></span>
    </body>
</html>
