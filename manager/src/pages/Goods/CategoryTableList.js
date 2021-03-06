import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Dropdown, Form, Icon, List, Menu } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './CategoryTableList.less';
import moment from 'moment';

/* eslint react/no-multi-comp:0 */
@connect(({}) => ({}))
@Form.create()
class CategoryTableList extends PureComponent {
  componentDidMount() {}

  render() {
    const { categories, loading, pagination } = this.props;
    const ListContent = ({ data: { createDate, parentId, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>上级Id</span>
          <p>{parentId}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>创建日期</span>
          <p>{moment(createDate).format('YYYY-MM-DD HH:mm')}</p>
        </div>
      </div>
    );
    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
            <Menu.Item key="edit">编辑</Menu.Item>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );
    return (
      <PageHeaderWrapper title="分类列表">
        <Card bordered={false}>
          <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8 }}
            icon="plus"
            // onClick={() => router.push('/goods/goodsSaveForm')}
          >
            添加
          </Button>
          <List
            size="large"
            rowKey="id"
            loading={loading}
            pagination={{
              ...pagination,
              onChange: (page, pageSize) => fetchPage('linkLocation', { page, pageSize }),
            }}
            dataSource={categories}
            renderItem={item => (
              <List.Item
                actions={[
                  <a
                    onClick={e => {
                      e.preventDefault();
                      this.showEditModal(item);
                    }}
                  >
                    编辑
                  </a>,
                  <MoreBtn current={item} />,
                ]}
              >
                <List.Item.Meta
                  avatar={<img className={styles.thumb} src={item.thumb.key} />}
                  title={item.name}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CategoryTableList;
