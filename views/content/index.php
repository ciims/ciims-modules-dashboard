<section class="paginated_results">
	<div class="paginated_search">
		<?php $form=$this->beginWidget('cii.widgets.CiiActiveForm', array(
	        'id'					=> 'search-form',
	        'enableAjaxValidation'	=> false,
	        'action'                => null,
	        'htmlOptions' => array(
	            'class' => 'pure-form pure-form-aligned'
	        )
	    )); ?>
	    	<?php echo CHtml::textField('search', NULL, array('placeholder' => Yii::t('Dashboard.views', 'Search for an Entry'))); ?>
	    	<a href="<?php echo $this->createUrl('/dashboard/content/save'); ?>" class="pure-button pure-button-success pure-button-xsmall" id="NewEntryButton">
	    		<span class="fa fa-plus"></span>
	    	</a>
	    <?php $this->endWidget(); ?>
	</div>
	<div class="nano">
		<div class="nano-content">
			<ul>
			</ul>
		</div>
	</div>
</section>

<section id="filter_container" class="settings_container">
	<div class="filter-container">
		<?php echo Yii::t('Dashboard.main', 'Filter By:'); ?>
		<ul class="filter">
			<li class="draft-text-li" data-attr-param="Content[status]=0"><?php echo Yii::t('Dashboard.main', 'Drafts'); ?></li>
			<li class="scheduled-text-li" data-attr-param="Content[status]=1&Content[published]=false"><?php echo Yii::t('Dashboard.main', 'Scheduled'); ?></li>
			<li class="published-text-li" data-attr-param="Content[status]=1&Content[published]=true"><?php echo Yii::t('Dashboard.main', 'Published'); ?></li>
		</ul>
	</div>
	<div class="order-container">
		<?php echo Yii::t('Dashboard.main', 'Sort By:'); ?>
		<ul class="order">
			<li name="title"><?php echo Yii::t('Dashboard.main', 'Title'); ?></li>
			<li name="author_id"><?php echo Yii::t('Dashboard.main', 'Author'); ?></li>
			<li name="category_id"><?php echo Yii::t('Dashboard.main', 'Category'); ?></li>
			<li name="published"><?php echo Yii::t('Dashboard.main', 'Published Date'); ?></li>
			<li name="created"><?php echo Yii::t('Dashboard.main', 'Creation Date'); ?></li>
		</ul>
	</div>
	<div class="clearfix"></div>
</section>

<section id="content_container" class="settings_container"></section>
<section id="comment_container" class="settings_container">
	<div class="nano">
		<div class="nano-content">
			<?php $this->widget('ext.cii.widgets.comments.CiiCommentWidget'); ?>
		</div>
	</div>
</section>

<?php echo CHtml::tag('span', array('class' => 'draft-text', 'style' => 'display: none'), Yii::t('Dashboard.views', 'Draft')); ?>
<?php echo CHtml::tag('span', array('class' => 'scheduled-text', 'style' => 'display: none'), Yii::t('Dashboard.views', 'Scheduled For {{date}}')); ?>

<?php $this->widget('ext.cii.widgets.comments.CiiCommentMaster', array(
	'type' => Cii::getCommentProvider(), 
	'content' => false
)); ?>

<?php Yii::app()->clientScript->registerScript('ContentMain', 'Content.init();'); ?>