'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MetaAdsProps {
  ad: {
    id: string;
    advertiser: {
      name: string;
      avatar: string;
      verified: boolean;
    };
    status: 'active' | 'inactive';
    primaryText: string;
    headline: string;
    description: string;
    media: {
      type: 'image' | 'video';
      url: string;
      thumbnail?: string;
    }[];
    linkPreview: {
      domain: string;
      title: string;
      description: string;
      image: string;
    };
    cta: {
      text: string;
      action: string;
    };
    engagement: {
      likes: number;
      comments: number;
      shares: number;
    };
    campaign: {
      startDate: string;
      endDate: string;
      platforms: string[];
      adType: string;
      targetAudience?: string;
    };
    performance: {
      impressions: number;
      clicks: number;
      ctr: number;
      chartData: Array<{ date: string; impressions: number; clicks: number }>;
    };
  };
}

export function MetaAds({ ad }: MetaAdsProps) {
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const shouldTruncateText = ad.primaryText.length > 200;
  const displayText = shouldTruncateText && !isTextExpanded 
    ? ad.primaryText.slice(0, 200) + '...' 
    : ad.primaryText;

  return (
    <div style={{
      background: 'linear-gradient(145deg, #f1f5f9, #eef3f8 60%, #f5f9fc)',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '10px 28px',
        background: 'linear-gradient(90deg, #ffffffcc, #ffffff 40%, #ffffffcc)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #d9e2ec',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          fontWeight: 600,
          fontSize: '18px',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#1d3657'
        }}>
          <span style={{
            background: 'linear-gradient(120deg, #2563eb, #60a5fa 60%, #3b82f6)',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>AdSpy</span> Detail
        </div>
        <div style={{ flex: 1, maxWidth: '520px', position: 'relative' }}>
          <input
            placeholder="搜索广告 ID / Page / 关键词..."
            value={ad.id}
            readOnly
            style={{
              width: '100%',
              background: '#ffffff',
              border: '1px solid #d9e2ec',
              padding: '10px 40px 10px 14px',
              borderRadius: '8px',
              color: '#1f2933',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <div style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '16px',
            color: '#5d6b78'
          }}>🔍</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button style={{
            background: '#ffffff',
            border: '1px solid #d9e2ec',
            padding: '6px 12px',
            fontSize: '12.5px',
            borderRadius: '8px',
            color: '#1f2933',
            cursor: 'pointer'
          }}>Copy page</button>
          <button style={{
            background: '#ffffff',
            border: '1px solid #d9e2ec',
            padding: '6px 12px',
            fontSize: '12.5px',
            borderRadius: '8px',
            color: '#1f2933',
            cursor: 'pointer'
          }}>收藏</button>
          <button style={{
            background: '#2563eb',
            border: '1px solid #2563eb',
            color: '#fff',
            fontWeight: 500,
            padding: '6px 12px',
            fontSize: '12.5px',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px -2px rgba(37,99,235,.45)'
          }}>专业版</button>
        </div>
      </header>

      {/* Main Layout */}
      <main style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr 340px',
        gap: '18px',
        padding: '22px 28px 60px'
      }}>
        {/* 左侧 - 创意素材 */}
        <aside style={{
          background: '#ffffff',
          border: '1px solid #d9e2ec',
          borderRadius: '14px',
          padding: '18px 20px 20px',
          boxShadow: '0 4px 14px -4px rgba(27,47,69,.18), 0 2px 4px -2px rgba(27,47,69,.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {/* 媒体内容 */}
          <div style={{
            position: 'relative',
            aspectRatio: '9 / 16',
            background: '#f0f3f7',
            border: '1px solid #d9e2ec',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {ad.media[currentMediaIndex].type === 'image' ? (
              <img
                src={ad.media[currentMediaIndex].url}
                alt="素材截图"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            ) : (
              <video
                src={ad.media[currentMediaIndex].url}
                poster={ad.media[currentMediaIndex].thumbnail}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                controls
              />
            )}
          </div>

          {/* 提取信息 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            background: '#f7f9fc',
            border: '1px dashed #c8d4e2',
            padding: '14px 16px 16px',
            borderRadius: '12px',
            fontSize: '13px',
            lineHeight: 1.5,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              right: '12px',
              top: '8px',
              fontSize: '10px',
              letterSpacing: '0.5px',
              color: '#7a8895'
            }}>来源：截图 OCR</div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: '8px',
              alignItems: 'start'
            }}>
              <label style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: '#5d6b78',
                lineHeight: 1.4,
                paddingTop: '2px'
              }}>Page</label>
              <div>{ad.advertiser.name}</div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: '8px',
              alignItems: 'start'
            }}>
              <label style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: '#5d6b78',
                lineHeight: 1.4,
                paddingTop: '2px'
              }}>描述</label>
              <div>{ad.description}</div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: '8px',
              alignItems: 'start'
            }}>
              <label style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: '#5d6b78',
                lineHeight: 1.4,
                paddingTop: '2px'
              }}>链接</label>
              <div>
                <a 
                  href={`https://${ad.linkPreview.domain}`}
                  target="_blank"
                  rel="noopener"
                  style={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    wordBreak: 'break-all'
                  }}
                >
                  https://{ad.linkPreview.domain}
                </a>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: '8px',
              alignItems: 'start'
            }}>
              <label style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: '#5d6b78',
                lineHeight: 1.4,
                paddingTop: '2px'
              }}>点赞</label>
              <div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#e9f4ff',
                  border: '1px solid #c5def4',
                  color: '#155b91',
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontWeight: 500,
                  marginTop: '2px'
                }}>
                  {ad.engagement.likes.toLocaleString()} likes
                </span>
              </div>
            </div>

            <hr style={{
              height: '1px',
              background: 'repeating-linear-gradient(90deg, transparent 0 6px, #c8d4e2 6px 120px)',
              margin: '4px 0 2px',
              opacity: 0.75,
              border: 'none'
            }} />

            <div style={{
              fontSize: '11px',
              letterSpacing: '0.8px',
              fontWeight: 600,
              color: '#425565',
              textTransform: 'uppercase',
              margin: '2px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>Headline</div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: '8px',
              alignItems: 'start'
            }}>
              <label style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: '#5d6b78',
                lineHeight: 1.4,
                paddingTop: '2px'
              }}>标题</label>
              <div>{ad.headline}</div>
            </div>
          </div>
        </aside>

        {/* 中间 - 广告详情 */}
        <section style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {/* 广告主信息 */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #d9e2ec',
            borderRadius: '14px',
            padding: '18px 20px 20px',
            boxShadow: '0 4px 14px -4px rgba(27,47,69,.18), 0 2px 4px -2px rgba(27,47,69,.08)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '4px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.3px',
                color: '#1d2d3a'
              }}>广告主信息</h3>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                overflow: 'hidden',
                flexShrink: 0,
                border: '1px solid #d9e2ec',
                background: '#e7eef6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 600,
                color: '#2563eb'
              }}>
                <img
                  src={ad.advertiser.avatar}
                  alt={ad.advertiser.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{
                  margin: '0 0 4px',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#142434'
                }}>{ad.advertiser.name}</h2>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  fontSize: '12.5px',
                  color: '#5d6b78'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    padding: '4px 8px 3px',
                    borderRadius: '20px',
                    background: ad.status === 'active' ? '#e3eeff' : '#f0f3f7',
                    color: ad.status === 'active' ? '#2563eb' : '#5d6b78',
                    fontWeight: 500,
                    letterSpacing: '0.3px'
                  }}>
                    {ad.status === 'active' ? '活跃' : '非活跃'}
                  </span>
                  <span>ID: {ad.id}</span>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  marginTop: '4px'
                }}>
                  <button style={{
                    background: '#2563eb',
                    border: '1px solid #2563eb',
                    color: '#fff',
                    fontWeight: 500,
                    padding: '8px 14px',
                    fontSize: '13px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}>关注</button>
                  <button style={{
                    background: '#ffffff',
                    border: '1px solid #d9e2ec',
                    color: '#1f2933',
                    padding: '8px 14px',
                    fontSize: '13px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}>查看页面</button>
                </div>
              </div>
            </div>
          </div>

          {/* 广告文案 */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #d9e2ec',
            borderRadius: '14px',
            padding: '18px 20px 20px',
            boxShadow: '0 4px 14px -4px rgba(27,47,69,.18), 0 2px 4px -2px rgba(27,47,69,.08)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.3px',
                color: '#1d2d3a'
              }}>广告文案</h3>
            </div>

            <div style={{
              background: '#f7f9fc',
              border: '1px solid #d9e2ec',
              borderRadius: '8px',
              padding: '14px 16px 16px'
            }}>
              <h4 style={{
                margin: '0 0 8px',
                fontSize: '13px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: '#1d2d3a',
                fontWeight: 600
              }}>Primary Text</h4>
              <div style={{
                fontSize: '14px',
                lineHeight: 1.55,
                whiteSpace: 'pre-wrap',
                color: '#24323e'
              }}>
                {displayText}
              </div>
              {shouldTruncateText && (
                <button
                  onClick={() => setIsTextExpanded(!isTextExpanded)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563eb',
                    fontSize: '12px',
                    cursor: 'pointer',
                    marginTop: '8px'
                  }}
                >
                  {isTextExpanded ? '收起' : '展开更多'}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 右侧 - 性能数据 */}
        <aside style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {/* 投放信息 */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #d9e2ec',
            borderRadius: '14px',
            padding: '18px 20px 20px',
            boxShadow: '0 4px 14px -4px rgba(27,47,69,.18), 0 2px 4px -2px rgba(27,47,69,.08)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.3px',
                color: '#1d2d3a'
              }}>投放信息</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '10px',
                fontSize: '12.5px',
                lineHeight: 1.4
              }}>
                <label style={{
                  color: '#5d6b78',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  fontSize: '11px'
                }}>投放时间</label>
                <div>{ad.campaign.startDate} - {ad.campaign.endDate}</div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '10px',
                fontSize: '12.5px',
                lineHeight: 1.4
              }}>
                <label style={{
                  color: '#5d6b78',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  fontSize: '11px'
                }}>投放平台</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {ad.campaign.platforms.map((platform) => (
                    <span
                      key={platform}
                      style={{
                        background: '#eef3f8',
                        border: '1px solid #d9e2ec',
                        fontSize: '11px',
                        padding: '4px 8px 3px',
                        borderRadius: '6px',
                        color: '#40505f'
                      }}
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '10px',
                fontSize: '12.5px',
                lineHeight: 1.4
              }}>
                <label style={{
                  color: '#5d6b78',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  fontSize: '11px'
                }}>广告类型</label>
                <span style={{
                  background: '#eef3f8',
                  border: '1px solid #d9e2ec',
                  fontSize: '11px',
                  padding: '4px 8px 3px',
                  borderRadius: '6px',
                  color: '#40505f'
                }}>
                  {ad.campaign.adType}
                </span>
              </div>
            </div>
          </div>

          {/* 性能数据 */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #d9e2ec',
            borderRadius: '14px',
            padding: '18px 20px 20px',
            boxShadow: '0 4px 14px -4px rgba(27,47,69,.18), 0 2px 4px -2px rgba(27,47,69,.08)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.3px',
                color: '#1d2d3a'
              }}>性能数据</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '10px',
                fontSize: '12.5px',
                lineHeight: 1.4
              }}>
                <label style={{
                  color: '#5d6b78',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  fontSize: '11px'
                }}>展示次数</label>
                <div>{(ad.performance.impressions / 1000).toFixed(1)}K</div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '10px',
                fontSize: '12.5px',
                lineHeight: 1.4
              }}>
                <label style={{
                  color: '#5d6b78',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  fontSize: '11px'
                }}>点击率</label>
                <div>{ad.performance.ctr.toFixed(2)}%</div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '10px',
                fontSize: '12.5px',
                lineHeight: 1.4
              }}>
                <label style={{
                  color: '#5d6b78',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  fontSize: '11px'
                }}>总点击数</label>
                <div>{ad.performance.clicks.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}