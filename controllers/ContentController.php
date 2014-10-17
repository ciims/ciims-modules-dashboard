<?php

class ContentController extends CiiDashboardController
{
	public function actionIndex()
	{
		$this->render('index');
	}

	/**
	 * Rndering action for the entry
	 * @param int $id 	The content ID
	 */
	public function actionSave($id = NULL)
	{
		$asModel = NULL;

		if ($id == NULL)
		{
			$model = new Content;
	        $model->savePrototype(Yii::app()->user->id);

	        $this->redirect('/dashboard/content/save/id/' . $model->id);
		}
		else
		{
			$model = $this->loadModel($id);
			$asModel = ContentMetadata::model()->findByAttributes(array('content_id' => $model->id, 'key' => 'autosave'));
			if ($asModel != NULL)
			{
				$model->populate(CJSON::decode($asModel->value));
				$model->autosavedata = true;
			}
		}

		$this->render('save', array(
			'model' => $model
		));
	}

	/**
     * Retrieves the model
     * @param  int    $id The content ID
     * @return Content
     */
    private function loadModel($id=NULL)
    {
        if ($id===NULL)
            throw new CHttpException(400, Yii::t('Dashboard.content', 'Missing id'));

        $model = Content::model()->findByPk($id);
        if ($model===NULL)
            throw new CHttpException(404, Yii::t('Dashboard.content', 'An entry with the id of {{id}} was not found', array('{{id}}' => $id)));

        return $model;
    }
}