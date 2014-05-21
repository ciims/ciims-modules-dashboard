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
	    	<?php echo CHtml::textField('search', NULL, array('placeholder' => Yii::t('Dashboard.views', 'Find a category...'))); ?>
	    	<span class="pure-button pure-button-success pure-button-xsmall" id="NewCategoryButton">
	    		<span class="fa fa-plus"></span>
	    	</span>
	    <?php $this->endWidget(); ?>
	</div>
	<div class="nano">
		<div class="nano-content">
			<ul>
			</ul>
		</div>
	</div>
</section>

<section id="create_form" class="settings_container">
	<!-- Category Form -->
	<div class="category">
		<fieldset>
			<legend><?php echo Yii::t('Dashboard.views', 'Create a New Content Category'); ?></legend>
			<?php $form=$this->beginWidget('cii.widgets.CiiActiveForm', array(
		        'id'					=> 'category-form',
		        'enableAjaxValidation'	=> false,
		        'action'                => null,
		        'htmlOptions' => array(
		            'class' => 'pure-form pure-form-aligned'
		        )
		    )); ?>
		    	<?php echo $form->textFieldRow($category, 'name', array('class' => 'pure-u-1', 'placeholder' => $category->getAttributeLabel('name'))); ?>
		    	<?php echo $form->textFieldRow($category, 'slug', array('class' => 'pure-u-1', 'placeholder' => $category->getAttributeLabel('slug'))); ?>
		    	<?php echo $form->dropDownListRow($category, 'parent_id', CHtml::listData(Categories::model()->findAll(), 'id', 'name'), array('class' => 'pure-u-1')); ?>
		    	<?php echo $form->textAreaRow($category, 'description', array('class' => 'pure-u-1', 'rows'=>10, 'placeholder' => $category->getAttributeLabel('description'))); ?>

		    	<?php echo CHtml::button(Yii::t('Dashboard.views', 'Create New Category'), array('id' => 'CategoryCreate_Submit', 'class' => 'pure-button pure-button-small pure-button-success pull-right')); ?>
		    <?php $this->endWidget(); ?>
		</fieldset>
	</div>
</section>

<section id="edit_form" class="settings_container" style="display:none">
	<!-- Category Form -->
	<div class="category">
		<fieldset>
			<legend><?php echo Yii::t('Dashboard.views', 'Modify a Category'); ?></legend>
			<?php $form=$this->beginWidget('cii.widgets.CiiActiveForm', array(
		        'id'					=> 'm-category-form',
		        'enableAjaxValidation'	=> false,
		        'action'                => null,
		        'htmlOptions' => array(
		            'class' => 'pure-form pure-form-aligned'
		        )
		    )); ?>
		    	<?php echo $form->hiddenField($category, 'id'); ?>
		    	<?php echo $form->textFieldRow($category, 'name', array('class' => 'pure-u-1', 'placeholder' => $category->getAttributeLabel('name'))); ?>
		    	<?php echo $form->textFieldRow($category, 'slug', array('class' => 'pure-u-1', 'placeholder' => $category->getAttributeLabel('slug'))); ?>
		    	<?php echo $form->dropDownListRow($category, 'parent_id', CHtml::listData(Categories::model()->findAll(), 'id', 'name'), array('class' => 'pure-u-1')); ?>
		    	<?php echo $form->textAreaRow($category, 'description', array('class' => 'pure-u-1', 'rows'=>10,  'placeholder' => $category->getAttributeLabel('description'))); ?>
		    	<?php echo CHtml::button(Yii::t('Dashboard.views', 'Modify Category'), array('id' => 'CategoryUpdate_Submit', 'class' => 'pure-button pure-button-small pure-button-success pull-right')); ?>
		    	<?php echo CHtml::button(Yii::t('Dashboard.views', 'Delete Category'), array('id' => 'CategoryDelete_Submit', 'class' => 'pure-button pure-button-small pure-button-error pull-right', 'style' => 'margin-right: 10px;')); ?>
		    <?php $this->endWidget(); ?>
		</fieldset>
	</div>
</section>

<?php Yii::app()->clientScript->registerScript('categories', 'Categories.registerCategories();'); ?>